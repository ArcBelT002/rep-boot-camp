async function fetchUsers() {
    try {
        const response = await fetch('http://localhost:3000/user');
        const portContactos = await response.json();
        console.log(portContactos);
        document.getElementById('portContactos').innerText = JSON.stringify(portContactos, null, 2);
    } catch (error) {
        console.error('Error fetching Users:', error);
    }
}

async function addUser() {
    const uNombre = document.getElementById('uNombre').value;
    const uEmail = document.getElementById('uEmail').value;
    const uMensaje = document.getElementById('uMensaje').value;
    const user = { uNombre, uEmail, uMensaje };

    try {
        const response = await fetch('http://localhost:3000/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        const newUser = await response.json();
        console.log('User added:', newUser);
        fetchUsers();
    } catch (error) {
        console.error('Error adding user:', error);
    }
}

document.addEventListener('DOMContentLoaded', fetchUsers);