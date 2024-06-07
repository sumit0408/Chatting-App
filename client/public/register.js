document.getElementById('registerButton').addEventListener('click', async () => {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/api/users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        });

        const data = await response.json();

        if (response.ok) {
            alert('Registration successful. Please log in.');
            window.location.href = '/login.html'; // Redirect to login page
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error registering:', error);
        alert('An error occurred while registering. Please try again.');
    }
});
