const jwt = require('jsonwebtoken');
const Users = require('../../repository/users');
const { HttpCode } = require('../../libs');
const { HttpError } = require('../../middlewares/handlerError');
const EmailService = require('../../services/email/service');
const SenderNodemailer = require('../../services/email/senders/nodemailer-sender');
require('dotenv').config();
const SECRET_KEY = process.env.JWT_SECRET_KEY;

class AuthService {
    async create(body) { 
      const user = await Users.findByEmail(body.email);
      if (user) {
          throw new HttpError(HttpCode.CONFLICT, 'Email in use');
        }

        const newUser = await Users.create(body);

        const sender = new SenderNodemailer();
        const emailService = new EmailService(sender);

        try {
            await emailService.sendEmail(newUser.email, newUser.verificationToken)
        } catch (error) {
            console.log(error);
            throw new HttpError(
                HttpCode.SERVICE_UNAVAILABLE,
                'Error sending email',
            )
        }
        
        return {
          id: newUser.id,
          email: newUser.email,
          subscription: newUser.subscription,
          avatarURL: newUser.avatarURL,
        //   verificationToken: newUser.verificationToken,
        }
    }

    async login({ email, password }) {
        const user = await this.getUser(email, password);
        if (!user) {
          throw new HttpError(
              HttpCode.UNAUTHORIZED,
              'Email or password is wrong',
          )
        }
        const token = this.generateToken(user);
        await Users.updateToken(user.id, token);

        return {
            token,
            user: {
                email: user.email,
                subscription: user.subscription,
            }
        };
    }
    
    async logout(id) {
        await Users.updateToken(id, null);
    }
    
    async getUser(email, password) {
        const user = await Users.findByEmail(email);
        if (!user) {
            return null;
        }
        if (!(await user?.isValidPassword(password))) {
            return null;
        }

        if (!user?.verify) {
            throw new HttpError(HttpCode.BAD_REQUEST, 'User not verified!')
        }

        return user;
    }

    generateToken(user) {
        const payload = { id: user.id, email: user.email, subscription: user.subscription };
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '2h' });
        return token;
    }

    async verifyUser(token) {
        const user = await Users.findByToken(token);
        
        if (!user) {
            throw new HttpError(HttpCode.NOT_FOUND, 'User not found')
        }
        if (user && user.verify) {
            throw new HttpError(HttpCode.BAD_REQUEST, 'Verification has already been passed')
        }

        await Users.verifyUser(user.id);

        return user;
    }
    
    async reverifyUser(email) {
        const user = await Users.findByEmail(email);
        
        if (!user) {
            throw new HttpError(HttpCode.NOT_FOUND, `User with email: ${email}, not found`)
        }
        if (user && user.verify) {
            throw new HttpError(HttpCode.BAD_REQUEST, 'Verification has already been passed')
        }

        const sender = new SenderNodemailer();
        const emailService = new EmailService(sender);

        try {
            await emailService.sendEmail(user.email, user.verificationToken)
        } catch (error) {
            console.log(error);
            throw new HttpError(
                HttpCode.SERVICE_UNAVAILABLE,
                'Error sending email',
            )
        }

        return user
     }
    
}

module.exports = new AuthService()