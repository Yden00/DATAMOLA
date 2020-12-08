class HeaderView {
  constructor(containerId) {
    this.containerId = containerId;
  }

  display(params) {
    document.querySelector(`#${this.containerId}`).innerHTML = `
        <div class="logo">
            <a href="#">
                <img src="./src/assets/icons/Logo.svg" alt="Logo">
                <h1>InWorld</h1>
            </a>
        </div>
        <div class="nav-bar">
            <span class="user">${params.login}</span>
            <a href="#"><img src="./src/assets/icons/Account.svg" alt="Account"></a>
            <a ><img class="log-out" src="./src/assets/icons/Logout.svg" alt="Logout"></a>
        </div>
    `;
    document.querySelector('.log-out').addEventListener('click', (event) => {
      event.preventDefault()
      regForm.style.display = 'none';
      logForm.style.display = 'flex';
      chat.style.display = 'none';
    })
  }
}


