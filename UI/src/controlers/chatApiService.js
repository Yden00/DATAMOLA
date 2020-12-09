class ChatApiService {
  constructor() {
    this.url = 'https://jslabdb.datamola.com'
  }
  async getMessages(skip = 0, top = 10, author = '', dateFrom = '', dateTo = '', text = '') {
    return await fetch(`https://jslabdb.datamola.com/messages?skip=${skip}&top=${top}&author=${author}&dateFrom=${dateFrom}&dateTo=${dateTo}&text=${text}`)
  }

  async postMessages(login, password, message) {
    return await fetch(`${this.url}/messages?login=${login}&password=${password}`, {
      method: 'POST',
      body: JSON.stringify({
        "text": message.text,
        "isPersonal": message.isPersonal,
        "to": message.to,
        "author": message.author
      })
    })
  }
  async putMessages(message) {
    return await fetch(`${this.url}/messages/${message.id}`, {
      method: 'POST',
      body: JSON.stringify({
        "text": message.text,
        "isPersonal": message.isPersonal,
        "to": message.to,
      })
    })
  }

  async delMessages(id) { 
    return await fetch(`${this.url}/messages/${id}`)
  }

  async getUsers() {
    return await fetch(`${this.url}/users`)
  }
}

const chatApiService = new ChatApiService()
