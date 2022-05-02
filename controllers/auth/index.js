const registration = require('./registration');
const login = require('./login');
const logout = require('./logout');

const verifyUser = require('./verifyUser');
const reverifyUser = require('./reverifyUser');

module.exports = {
    registration,
    login,
    logout,
    verifyUser,
    reverifyUser,
}