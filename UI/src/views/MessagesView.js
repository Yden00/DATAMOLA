class MessagesView {
  constructor(containerId) {
    this.containerId = containerId;
  }

  display(messagesArr) {
    document.querySelector(`#${this.containerId}`).innerHTML = messagesArr.map(
      (message) => {
        return `<div class="message-container">
       <div><img src="./src/assets/icons/ChatAccount.svg" alt="Account"></div>
      <div class="author-text">
          <span class="author">${message.author}</span>
          <input class='edit-text' type='text'>
          <button class ='edit-btn'>Edit</button>
          <p class='message-text'>${message.text}</p>
          ${message.isPersonal ? `<span class="to">to ${
            message['_to']
          }</span>` : ''}   
      </div>
      <span class="time">${message.createdAt.toLocaleString()}</span>
      <img data-message-id="${message.id}" class="remove-img" src="./src/assets/icons/Delete-msg.svg" alt="delete">
      <img data-message-id="${message.id}" class='edit-img' src="./src/assets/icons/Edit.svg" alt="edit">
      </div>`;
      }
    ).join('')
  }
}
