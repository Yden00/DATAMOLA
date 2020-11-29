const chat = document.querySelector('.main-content');
const regForm = document.querySelector('.registration-form');
const logForm = document.querySelector('.login-form');



function submitRegForm(event) {
  event.preventDefault()
  let regObj = {}
  event.target.querySelectorAll("input").forEach(item => {
    regObj = {
      ...regObj,
      [item.id]: item.value
    }
  })
  chatController.setCurrentUser(regObj)
  localStorage.setItem('user', JSON.stringify(regObj))
  regForm.style.display = 'none';
  logForm.style.display = 'flex';
}
regForm.addEventListener('submit', submitRegForm)

const messageInput = document.querySelector('.send')
document.querySelector('.send-msg').addEventListener('click', () => {
  chatController.addMessage({ text: messageInput.value, isPersonal: false, to: null })
  document.querySelector('.send').value = '';
})

const removeImgs = document.getElementById('messages-wrapper')
removeImgs.addEventListener("click", (event) => {
  if (event.target.dataset) {
    chatController.removeMessage(event.target.dataset.messageId)
  }
})

document.querySelector('.log-link').addEventListener('click', (event) => {
  event.preventDefault()
  regForm.style.display = 'none';
  logForm.style.display = 'flex';
})

document.querySelector('.reg-link').addEventListener('click', (event) => {
  event.preventDefault()
  regForm.style.display = 'flex';
  logForm.style.display = 'none';
})

function submitLogForm(event) {
  let user = JSON.parse(localStorage.getItem('user'))
  event.preventDefault()
  let logObj = {};
  event.target.querySelectorAll("input").forEach(item => {
    logObj = {
      ...logObj,
      [item.id]: item.value
    }
  })
  if (user.login === logObj.login && user.password === logObj.password) {
    chatController.setCurrentUser(logObj)
    localStorage.setItem('user', JSON.stringify(logObj))
    regForm.style.display = 'none';
    logForm.style.display = 'none';
    chat.style.display = 'grid';
  } else {
    document.querySelector('.error-log').style.display = "inline";
    setTimeout(()=>{document.querySelector('.error-log').style.display = "none";},5000) 
  }
}
logForm.addEventListener('submit', submitLogForm)
