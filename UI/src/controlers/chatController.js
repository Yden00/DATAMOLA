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
    this.messagesView.display(messageList.getPage());
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
    return userList.activeUsers;
  }
}

const chatController = new ChatController();
chatController.setCurrentUser('Vlad')
chatController.addMessage({ text: 'privet', isPersonal: false, to: null })
chatController.setCurrentUser('Daniil')
chatController.addMessage({ text: 'how are you', isPersonal: false, to: null })
chatController.setCurrentUser('Serega')
chatController.addMessage({ text: 'fine', isPersonal: false, to: null })
chatController.setCurrentUser('Anton')
chatController.addMessage({ text: 'and you?', isPersonal: false, to: null })
