const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
const ws = new WebSocket(`${protocol}://${window.location.host}`);

const form = document.getElementById('chat-form');
const input = document.getElementById('message-input');
const messages = document.getElementById('messages');

ws.onopen = () => console.log('Conectado ao servidor WS');

ws.onmessage = (event) => {
  addMessage(event.data, 'received');
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const msg = input.value.trim();
  if (!msg) return;
  addMessage(msg, 'sent');
  ws.send(msg);
  input.value = '';
});

function addMessage(msg, type) {
  const div = document.createElement('div');
  div.classList.add('message', type);
  div.textContent = msg;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}
