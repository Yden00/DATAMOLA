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
            <span>${params}</span>
            <a href="#"><img src="./src/assets/icons/Account.svg" alt="Account"></a>
            <a href="#"><img src="./src/assets/icons/Logout.svg" alt="Logout"></a>
        </div>
    `;
  }
}


