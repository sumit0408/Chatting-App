// client/public/chat.js

const socket = io();

const message = document.getElementById('message');
const output = document.getElementById('output');
const feedback = document.getElementById('feedback');
const sendButton = document.getElementById('send');

function sendMessage() {
    const userId = localStorage.getItem('userId');  // Retrieve userId from localStorage
    const content = message.value;
    if (content.trim()) {
        socket.emit('sendMessage', { senderId: userId, content });
        message.value = '';
    }
}

socket.on('message', (data) => {
    feedback.innerHTML = '';
    output.innerHTML += `<p><strong>${data.sender.username}:</strong> ${data.content}</p>`;
});

message.addEventListener('keypress', () => {
    const userId = localStorage.getItem('userId');
    socket.emit('typing', userId);
});

socket.on('typing', (data) => {
    feedback.innerHTML = `<p><em>${data} is typing a message...</em></p>`;
});
