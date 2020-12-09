
const chat = document.querySelector('.main-content');
const regForm = document.querySelector('.registration-form');
const logForm = document.querySelector('.login-form');

async function submitRegForm(event) {
  event.preventDefault();
  let regObj = {}
  event.target.querySelectorAll("input").forEach(item => {
    regObj = {
      ...regObj,
      [item.id]: item.value
    }
  })
  await fetch('https://jslabdb.datamola.com/auth/register', {
    method: 'POST',
    body: JSON.stringify({
      name: regObj.login,
      pass: regObj.password
    })
  }).then(() => {
    chatController.setCurrentUser(regObj);
    localStorage.setItem('user', JSON.stringify(regObj));
    regForm.style.display = 'none';
    logForm.style.display = 'flex';
    userList.addUser(regObj);
  });
}
regForm.addEventListener('submit', submitRegForm);

document.querySelectorAll('.account').forEach((el) => {
  el.addEventListener('click', (event) => {
    document.querySelector('.msg-user').innerHTML = `@${userList.users.filter((el) => el === event.target.textContent)}`;
    document.querySelector('.msg-user').style.display = 'inline';
  })
})

const messageInput = document.querySelector('.send');
document.querySelector('.send-msg').addEventListener('click', (event) => {
  event.preventDefault()
  if (document.querySelector('.msg-user').textContent === '' || document.querySelector('.msg-user').style.display === 'none') {
    chatController.addMessage({ text: messageInput.value, isPersonal: false, to: null })
    document.querySelector('.send').value = '';
  } else {
    chatController.addMessage({
      text: messageInput.value,
      isPersonal: true,
      to: userList.users.filter((el) => el === document.querySelector('.msg-user').textContent.substring(1)).join()
    })
    document.querySelector('.to').style.display = 'inline';
    document.querySelector('.msg-user').style.display = 'none';
    document.querySelector('.send').value = '';
  }
  event.stopPropagation()
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

async function submitLogForm(event) {
  event.preventDefault();
  let logObj = {};
  event.target.querySelectorAll("input").forEach(item => {
    logObj = {
      ...logObj,
      [item.id]: item.value
    }
  })
  await fetch('https://jslabdb.datamola.com/auth/login', {
    method: 'POST',
    mode: 'no-cors',
    body: JSON.stringify({
      name: logObj.login,
      pass: logObj.password
    })
  }).then(res => {
    chatController.setCurrentUser(logObj);
    regForm.style.display = 'none';
    logForm.style.display = 'none';
    chat.style.display = 'grid';
  }).catch(err => {
    document.querySelector('.error-log').style.display = "inline";
    setTimeout(() => { document.querySelector('.error-log').style.display = "none"; }, 5000);
  });
}
logForm.addEventListener('submit', submitLogForm);

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