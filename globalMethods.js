const headerView = require('./HeaderView');
const messagesView = require('./MessagesView');
const userList = require('./UserList');

function setCurrentUser(user) {
  headerView.currentUser = user;
  return true;
}

function addMessage({ text, isPersonal, to }) {}

function editMessage(id, { text, isPersonal, to }) {}

function removeMessage(id) {}

function showMessages() {}

function showActiveUsers() {
  return userList.activeUsers;
}
