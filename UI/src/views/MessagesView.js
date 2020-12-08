class MessagesView {
  constructor(containerId) {
    this.containerId = containerId;
  }

  display(messagesArr) {
    document.querySelector(`#${this.containerId}`).innerHTML = messagesArr.map(
      (message) => {
        debugger
        return `<div class="message-container">
       <div><img src="./src/assets/icons/ChatAccount.svg" alt="Account"></div>
      <div class="author-text">
          <span class="author">${message.author.login}</span>
          <p>${message.text}</p>
          ${message.isPersonal ? `<span class="to">to ${document.querySelector('.msg-user').textContent.substring(1)}</span>` : ''}
      </div>
      <span class="time">${message.createdAt.toLocaleString()}</span>
      <img data-message-id="${message.id}" class="remove-img" src="./src/assets/icons/Delete-msg.svg" alt="delete">
      <img class='edit-img' src="./src/assets/icons/Edit.svg" alt="edit">
      </div>`;
      }
    ).join('')
  } 
}

