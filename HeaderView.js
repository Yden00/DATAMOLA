class HeaderView {
  constructor(containerId) {
    this.containerId = containerId;
  }

  display(currentUser) {
    return currentUser || false;
  }
}

const headerView = new HeaderView();
module.exports = headerView;
