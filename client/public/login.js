// client/public/login.js
document.getElementById('loginButton').addEventListener('click', async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data.userId);
            window.location.href = '/chat.html'; // Redirect to chat page
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error logging in:', error);
        alert('An error occurred while logging in. Please try again.');
    }
});
