
class ChatController {
  constructor() {
    this.activeUsersView = new ActiveUsersView('account-list');
    this.filterView = new FilterView('dropdown');
    this.headerView = new HeaderView('header');
    this.messagesView = new MessagesView('messages-wrapper');
  }
  setCurrentUser(user) {
    messageList.currentUser = user;
    this.headerView.display(user);
  }

  addMessage({ text, isPersonal, to }) {
    const user = messageList.currentUser;
    const message = new Message(
      text,
      to,
      Date.now(),
      new Date(),
      user,
      isPersonal
    );
    messageList.add(message);
    this.messagesView.display(messageList.getPage( messageList.messages.length - 10 > 0 ? messageList.messages.length - 10 : 0 ,10,{}));
  }

  editMessage(id, { text, isPersonal, to }) {
    messageList.edit(id, { text, isPersonal, to });
    messagesView.display(messageList.getPage());
  }

  removeMessage(id) {
    messageList.remove(id);
    this.messagesView.display(messageList.getPage());
  }

  showMessages(skip, top, filterConfig) {
    const messages = messageList.getPage(skip, top, filterConfig);
    this.messagesView.display(messages);
  }

  showActiveUsers() {
    this.activeUsersView.display(userList.activeUsers)
  }
}

const chatController = new ChatController();
chatController.showActiveUsers()
chatController.filterView.display()
