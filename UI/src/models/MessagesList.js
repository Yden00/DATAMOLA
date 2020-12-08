class MessageList {
  constructor(messages = []) {
    this.messages = messages;
  }
  static _filterObj = {
    author: (item, author) => !author || item.author.toLowerCase().includes(author.toLowerCase()),
    text: (item, text) => !item || item.text.toLowerCase().includes(text.toLowerCase()),
    dateTo: (item, dateTo) => !dateTo || item.dateTo < dateTo,
    dateFrom: (item, dateFrom) => !dateFrom || item.dateFrom > dateFrom
  }
  static _validateObj = {
    text: (item) => item.text && item.text.length <= 200
  }

  _user = null

  get currentUser() {
    return this._user;
  }

  set currentUser(user) {
    this._user = user;
  }
  getPage(skip = 0, top = 10, filterConfig = {}) { 
    Object.keys(filterConfig).forEach(key => {
      this.messages = this.messages.filter(item => MessageList._filterObj[key](item, filterConfig[key]));
    })
    return [...this.messages.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))].slice(skip, skip + top);
  }

  get(id) {
    return this.messages.find(item => item.id === id);
  }

  add(message) {
    if (MessageList.validate(message) && this._user === message.author) {
      message.id = `${+new Date()}`;
      message.createdAt = new Date();
       this.messages.push(message);
      return true
    }
    return false;
  }

  edit(id, message) {
    const messageToEdit = message.find(item => item.id === id);
    if (MessageList.validate(messageToEdit) && this._user === message.author) {
      this.messages = this.messages.map(item => {
        return item.id === id ? {
          ...messageToEdit,
          ...message,
        } : item;
      });
      return true;
    } else {
      return false;
    }
  }
  remove(id) {
    const newMessages = this.messages.filter(item => item.id !== id);
    if (newMessages.length !== this.messages.length) {
      this.messages = newMessages;
      return true;
    } else {
      return false;
    }
  }

  static validate(msg) {
    return Object.keys(MessageList._validateObj).every(key => MessageList._validateObj[key](msg));
  }
}

const fetchMessages = async (skip = 0, top = 10, author = '', dateFrom = '', dateTo = '', text = '') => {
  return await fetch(`https://jslabdb.datamola.com/messages?skip=${skip}&top=${top}&author=${author}&dateFrom=${dateFrom}&dateTo=${dateTo}&text=${text}`)
};

const messageList = new MessageList();
