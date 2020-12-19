
class ChatApiService {
  constructor() {
    this.url = 'https://jslabdb.datamola.com'
  }

  postRegister = async (event) => {
    event.preventDefault();
    let regObj = {}
    event.target.querySelectorAll("input").forEach(item => {
      regObj = {
        ...regObj,
        [item.id]: item.value
      }
    })
    const body = new FormData()
    body.append('name', regObj.login)
    body.append('pass', regObj.password)
    return await fetch(`${this.url}/auth/register`, {
      method: 'POST',
      // headers: {'Content-Type': 'form-data'},
      body
    }).then(res => {
      chatController.setCurrentUser(regObj);
      regForm.style.display = 'none';
      logForm.style.display = 'flex';
      chatController.showActiveUsers();
    });
  }

  postLogin = async (event) => {
    event.preventDefault();
    let logObj = {};
    event.target.querySelectorAll("input").forEach(item => {
      logObj = {
        ...logObj,
        [item.id.replace('log-', '')]: item.value
      }
    })
    const body = new FormData()
    body.append('name', logObj.login)
    body.append('pass', logObj.password)
    return await fetch(`${this.url}/auth/login`, {
      method: 'POST',
      body
    }).then(res => {
      chatController.setCurrentUser(logObj);
    }).then(res => {
      regForm.style.display = 'none';
      logForm.style.display = 'none';
      chat.style.display = 'grid';
    }).then(res => {
      chatController.showActiveUsers()
    }).catch(err => {
      document.querySelector('.error-log').style.display = "inline";
      setTimeout(() => { document.querySelector('.error-log').style.display = "none"; }, 5000);
    });
  }

  async postLogout() {
    return await fetch(`${this.url}/logout`)
  }

  async getMessages(skip = 0, top = 10, author = '', dateFrom = '', dateTo = '', text = '') {
    return await fetch(`${this.url}/messages?skip=${skip}&top=${top}&author=${author}&dateFrom=${dateFrom}&dateTo=${dateTo}&text=${text}`)
  }

  async postMessages(login, password, message) {
    return await fetch(`${this.url}/messages?name=${login}&pass=${password}`, {
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
      method: 'PUT',
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

  getUsers = async () => {
    return await fetch(`${this.url}/users`).then(res => res.json())
  }
}

const chatApiService = new ChatApiService()
