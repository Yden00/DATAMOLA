const Message = require("../models/MessageContainer");
const { messageList } = require("../models/MessagesList");
const userList = require("../models/UserList");
const { headerView } = require("../views/HeaderView");

function setCurrentUser(user) {
  messageList.currentUser = user; 
  headerView.display(user);
}

function addMessage({ text, isPersonal, to }) {
  const user = messageList.currentUser;
  const message = new Message(text, to, Date.now(), new Date(), user, isPersonal);
  messageList.add(message);
  messagesView.display(messageList.getPage());
}

function editMessage(id, { text, isPersonal, to }) {
  messageList.edit(id, {text, isPersonal, to});
  messagesView.display(messageList.getPage());
}

function removeMessage(id) {
  messageList.remove(id);
  messagesView.display(messageList.getPage());
}

function showMessages(skip, top, filterConfig) {
  const messages = messageList.getPage(skip, top, filterConfig);
  messageList.display(messages);
}

function showActiveUsers() {
  return userList.activeUsers;
}
