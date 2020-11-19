class MessagesView {
  constructor(containerId) {
    this.containerId = containerId;
  }

  display(messages) {
    return messages;
  }
}

const messagesView = new MessagesView();
module.exports = messagesView;
