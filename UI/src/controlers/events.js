const chat = document.querySelector('.main-content');
const regForm = document.querySelector('.registration-form');
const logForm = document.querySelector('.login-form');

regForm.addEventListener('submit', chatApiService.postRegister);
logForm.addEventListener('submit', chatApiService.postLogin)


// document.querySelectorAll('.account').forEach((el) => {
//   el.addEventListener('click',(event) => {
//     const apiUsers = chatApiService.getUsers()
//     document.querySelector('.msg-user').innerHTML = `@${apiUsers.filter((el) => el.name === event.target.textContent)}`;
//     document.querySelector('.msg-user').style.display = 'inline';

//   })    
// })

document.getElementById('account-list').addEventListener('click', event => msgUser(event))

async function msgUser(event) {
  event.preventDefault()
  const apiUsers = await chatApiService.getUsers()
  document.querySelector('.msg-user').innerHTML = `@${apiUsers.find(el => el.name === event.target.textContent).name}`;
  document.querySelector('.msg-user').style.display = 'inline';
  event.stopPropagation()
}


const messageInput = document.querySelector('.send');
document.querySelector('.send-msg').addEventListener('click', (event) => {
  if (document.querySelector('.msg-user').textContent === '' || document.querySelector('.msg-user').style.display === 'none') {
    const user = chatController.getCurrentUser()
    chatApiService.postMessages(user.login, user.password, { text: messageInput.value, isPersonal: false, to: null, author: user.login }).then(res => {
      chatController.addMessage({ text: messageInput.value, isPersonal: false, to: null, author: user.login })
      document.querySelector('.send').value = '';
    })
  } else {
    chatApiService.postMessages(user.login, user.password, { text: messageInput.value, isPersonal: false, to: null, author: user.login }).then(res => {
      chatController.addMessage({
        text: messageInput.value,
        isPersonal: true,
        to: userList.users.filter((el) => el === document.querySelector('.msg-user').textContent.substring(1)).join()
      })
      document.querySelector('.to').style.display = 'inline';
      document.querySelector('.msg-user').style.display = 'none';
      document.querySelector('.send').value = '';

      event.stopPropagation()
    })
  }
})

document.getElementById('messages-wrapper').addEventListener("click", (event) => {
  if (event.target.dataset && event.target === document.querySelector('.remove-img') &&
    document.querySelector('.user')?.textContent === document.querySelector('.author').textContent) {
    chatController.removeMessage(event.target.dataset.messageId);
    event.stopPropagation()
  }
})

document.querySelector('.load').addEventListener('click', () => {
  chatController.showMessages(0, messageList.messages.length, {});
})

document.querySelector('.log-link').addEventListener('click', (event) => {
  event.preventDefault();
  regForm.style.display = 'none';
  logForm.style.display = 'flex';
})

document.querySelector('.reg-link').addEventListener('click', (event) => {
  event.preventDefault();
  regForm.style.display = 'flex';
  logForm.style.display = 'none';
})


logForm.addEventListener('submit', chatApiService.postRegister);

document.querySelector('.private-message').addEventListener('click', () => {
  const accountList = document.getElementById('account-list');
  if (accountList.style.display === "block") {
    accountList.style.display = "none";
  } else {
    accountList.style.display = "block";
  }
})

document.querySelector('.filter-img').addEventListener('click', () => {
  const dropdownContent = document.querySelector('.dropdown-content');
  if (dropdownContent.style.display === "block") {
    dropdownContent.style.display = "none";
  } else {
    dropdownContent.style.display = "block";
  }
})

document.querySelector('.private').addEventListener('change', (event) => {
  if (event.target.checked) {
    chatController.messagesView.display(
      messageList.messages.filter((el) => Object.values(el).slice(-1).join('') !== ""))
  } else {
    chatController.showMessages()
  }
})

document.getElementById('messages-wrapper').addEventListener('click', (event) => {
  if (event.target.dataset && event.target === document.querySelector('.edit-img') && document.querySelector('.user')?.textContent === document.querySelector('.author').textContent) {
    document.querySelector('.message-text').style.display = 'none'
    document.querySelector('.edit-text').style.display = 'block'
    document.querySelector('.edit-btn').style.display = 'block'
  }
  event.stopPropagation()
})
document.getElementById('messages-wrapper').addEventListener('click', (event) => {
  if (event.target === document.querySelector('.edit-btn')) {
    document.querySelector('.message-text').innerText = document.querySelector('.edit-text').value;
    document.querySelector('.edit-text').style.display = 'none';
    document.querySelector('.edit-btn').style.display = 'none';
    document.querySelector('.message-text').style.display = 'block';
  }
})