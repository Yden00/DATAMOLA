class MessagesView {
  constructor(containerId) {
    this.containerId = containerId;
  }

  display(messagesArr) {
    document.querySelector(`#${this.containerId}`).innerHTML = messagesArr.map(
      (el) => {
        return `<div class="message-container">
       <div><img src="./src/assets/icons/ChatAccount.svg" alt="Account"></div>
      <div>
          <span>${el.author}</span>
          <p>${el.text}</p>
      </div>
      <span class="time">${el.createdAt.toLocaleString()}</span>
      </div>`;
      }
    ).join('');
  }
}

