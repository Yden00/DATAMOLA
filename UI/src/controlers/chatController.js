
class ChatController {
  constructor() {
    this.activeUsersView = new ActiveUsersView('account-list');
    this.filterView = new FilterView('dropdown');
    this.headerView = new HeaderView('header');
    this.messagesView = new MessagesView('messages-wrapper');
  }
  setCurrentUser(user) {
    this.headerView.display(user);
    this.currentUser = user;
  }

  getCurrentUser() {
    return this.currentUser
  }

  async addMessage({ text, isPersonal, to }) {
    const user = messageList.currentUser;
    const message = new Message(
      text,
      to,
      Date.now(),
      new Date(),
      user,
      isPersonal
    );
    const messages = await chatApiService.getMessages().then(res => {
      return res.json()
    })
    this.messagesView.display(messages);
  }

  editMessage(id, { text, isPersonal, to }) {
    messageList.edit(id, { text, isPersonal, to });
    messagesView.display(messageList.getPage());
  }

  removeMessage(id) {
    messageList.remove(id);
    this.messagesView.display(messageList.getPage());
  }

  async showMessages(skip, top, filterConfig) {
    const messages = messageList.getPage(skip, top, filterConfig);
    const loadMore = await chatApiService.getMessages(0, 0, '', '', '', '').then(res => {
      return res.json()
    })
    this.messagesView.display(loadMore);
  }

  async showActiveUsers() {
    const apiUsers = await chatApiService.getUsers()
    this.activeUsersView.display(apiUsers)
  }
}

const chatController = new ChatController();
chatController.filterView.display()

