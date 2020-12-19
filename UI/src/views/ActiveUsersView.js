class ActiveUsersView {
  constructor(containerId) {
    this.containerId = containerId;
  }

  display(activeUsers) {
    document.querySelector(`#${this.containerId}`).innerHTML = activeUsers.map(
      (el) => `
        <div class="account">
          <img src="./src/assets/icons/SmallAccount.svg" alt="smallAccount">
          <p class="active-user">${el.name}</p>
        </div>
        `
    ).join('');
  }
}

