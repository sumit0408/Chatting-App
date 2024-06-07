// const socket = io();

// const message = document.getElementById('message');
// const output = document.getElementById('output');
// const feedback = document.getElementById('feedback');
// const sendButton = document.getElementById('send');

// sendButton.addEventListener('click', () => {
//     socket.emit('sendMessage', {
//         senderId: userId,
//         content: message.value
//     });
//     message.value = '';
// });

// socket.on('message', (data) => {
//     feedback.innerHTML = '';
//     output.innerHTML += `<p><strong>${data.sender.username}:</strong> ${data.content}</p>`;
// });


const socket = io();
const userId = localStorage.getItem('userId');
const room = 'room1'; // Both users should have the same room

socket.emit('joinRoom', { userId, room });

const messageInput = document.getElementById('message');
const output = document.getElementById('output');
const feedback = document.getElementById('feedback');
const sendButton = document.getElementById('send');
const uploadButton = document.getElementById('upload');
const fileInput = document.getElementById('fileInput');

const sendMessage = () => {
    if (messageInput.value.trim() !== '') {
        socket.emit('sendMessage', {
            room,
            senderId: userId,
            content: messageInput.value
        });
        messageInput.value = '';
    }
};

sendButton.addEventListener('click', sendMessage);

messageInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

uploadButton.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            socket.emit('sendFile', {
                room,
                senderId: userId,
                fileName: file.name,
                fileContent: reader.result
            });
        };
        reader.readAsDataURL(file); // Read file as Base64 string
    }
});

socket.on('message', (data) => {
    feedback.innerHTML = '';
    const alignment = data.sender._id === userId ? 'sent' : 'received';
    output.innerHTML += `<div class="message ${alignment}"><div class="bubble"><strong>${data.sender.username}:</strong> ${data.content}</div></div>`;
});

socket.on('fileMessage', (data) => {
    feedback.innerHTML = '';
    const alignment = data.sender._id === userId ? 'sent' : 'received';
    output.innerHTML += `<div class="message ${alignment}"><div class="bubble"><strong>${data.sender.username}:</strong> <a href="${data.fileContent}" download="${data.fileName}">${data.fileName}</a></div></div>`;
});
