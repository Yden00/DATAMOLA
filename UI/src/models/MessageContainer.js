class Message {
  constructor(
    text = '',
    to = null,
    id = null,
    createdAt = null,
    author = null,
    isPersonal = null,
  ) {
    this._id = id;
    this.text = text;
    this._createdAt = createdAt || new Date();
    this._author = author;
    this.isPersonal = isPersonal ?? !!to;
    this._to = to;
  }

  get id() {
    return this._id;
  }
  set id(id) {
    return this._id = id;
  }

  get createdAt() {
    return this._createdAt;
  }
  set createdAt(createdAt) {
    return this._createdAt = createdAt
  }

  get author() {
    return this._author;
  }
  set author(author) {
    return this._author = author;
  }
}