const loginForm = document.querySelector('#welcome-form');
const mesagesSection = document.querySelector('#messages-section');
const messagesList = document.querySelector('#messages-list');
const addMessageForm = document.querySelector('#add-messages-form');
const userNameInput = loginForm.querySelector('#username');
const messageContentInput = addMessageForm.querySelector('#message-content');

const socket = io();

socket.on('message', ({ author, content }) => addMessage(author, content))
socket.on('login', ({ userName }) => login(userName));

let userName = '';

const login = e => {
    e.preventDefault();
    if (userNameInput.value !== '') {
      userName = userNameInput.value;
      loginForm.classList.remove('show');
      mesagesSection.classList.add('show');
      socket.emit('login', { author: userName });
    } else alert('We need to know who you are');
  };

function addMessage(author, content) {
    const message = document.createElement('li');
    message.classList.add('message');
    author !== userName ? message.classList.add('message--received') : message.classList.add('message--self');
    author === 'Chat Bot' ? message.classList.add('message--info') : '';
    message.innerHTML = `
      <h3 class="message__author">${userName === author ? 'You' : author }</h3>
      <div class="message__content">
        ${content}
      </div>
    `;
    messagesList.appendChild(message);
  }

function sendMessage(e) {
    e.preventDefault();
  
    let messageContent = messageContentInput.value;
  
    if(!messageContent.length) {
      alert('You have to type something!');
    }
    else {
      addMessage(userName, messageContent);
      socket.emit('message', { author: userName, content: messageContent })
      messageContentInput.value = '';
    }
  
  }

  loginForm.addEventListener('submit', e => {
    login(e);
  });

  addMessageForm.addEventListener('submit', e => {
    sendMessage(e);
  });