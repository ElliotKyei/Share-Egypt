class User {
  constructor(id, name, username, password, email, phoneNumber= '', subscriptions = [], bookmarks = [], avatarURL = '') {
    this.id = id;
    this.name = name;
    this.username = username;
    this.password = password;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.subscriptions = subscriptions;
    this.bookmarks = bookmarks;
    this.avatarURL = avatarURL;
  }
}

module.exports = User;