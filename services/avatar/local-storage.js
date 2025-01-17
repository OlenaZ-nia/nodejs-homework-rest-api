const path = require('path');
const fs = require('fs/promises');
const Users = require('../../repository/users');

class LocalStorage {
  constructor(file, user) {
      this.file = file;
      this.user = user;
      this.static = process.env.STATIC_FOLDER;
  }

  async save() {
      const destination = path.join(this.static, "avatars", this.user.id); // создаем папку public/avatars и в ней папку юзера
      await fs.mkdir(destination, { recursive: true });
      await fs.rename(this.file.path, path.join(destination, this.file.filename)); // переносим из папки upload-tmp в созданную папку для юзера 
      const urlOfAvatar = path.normalize(
          path.join("avatars", this.user.id, this.file.filename),
      ); // сохраняем относительный путь к файлу( относительно стат.ресурсов)
      await Users.updateAvatar(this.user.id, urlOfAvatar);
      return urlOfAvatar
  }
}

module.exports = LocalStorage