class UserList {
  constructor(users, activeUsers) {
    this.users = users;
    this.activeUsers = activeUsers;
  }
  addUser(user){
    this.users.push(user)
  }
}

const userList = new UserList();