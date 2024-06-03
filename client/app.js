const loginForm = document.querySelector('#welcome-form');
const mesagesSection = document.querySelector('#messages-section');
const messagesList = document.querySelector('#messages-list');
const addMessageForm = document.querySelector('#add-messages-form');
const userNameInput = loginForm.querySelector('#username');
const messageContentInput = addMessageForm.querySelector('#message-content');

let userName = '';

const login = e => {
    e.preventDefault();
    if (userNameInput.value !== '') {
      userName = userNameInput.value;
      loginForm.classList.remove('show');
      mesagesSection.classList.add('show');
    } else alert('We need to know who you are');
  };

function addMessage(author, content) {
    const message = document.createElement('li');
    message.classList.add('message');
    message.classList.add('message--received');
    if(author === userName) message.classList.add('message--self');
    message.innerHTML = `
      <h3 class="message__author">${userName === author ? 'You' : author }</h3>
      <div class="message__content">
        ${content}
      </div>
    `;
    messagesList.appendChild(message);
  }

const sendMessage = e => {
    e.preventDefault();
  
    if (messageContentInput.value !== '') {
      addMessage(userName, messageContentInput.value);
      messageContentInput.value = '';
    } else {
      alert(
        'the message cannot be empty'
      );
    }
  };

  loginForm.addEventListener('submit', e => {
    login(e);
  });

  addMessageForm.addEventListener('submit', e => {
    sendMessage(e);
  });