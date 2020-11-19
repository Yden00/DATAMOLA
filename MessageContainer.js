/* eslint-disable prettier/prettier */
class Message {
  constructor(text = '', to = null, id = null, createdAt = null, author = null, isPersonal = null, user) {
    this._id = id;
    this.text = text;
    this._createdAt = createdAt || new Date();
    this._author = author;
    this.isPersonal = isPersonal ?? !!to;
    this._to = to;
    this._user = user || author;
  }

  get id() {
    return this._id;
  }

  get createdAt() {
    return this._createdAt;
  }

  get author() {
    return this._author;
  }
}

module.exports = Message;
