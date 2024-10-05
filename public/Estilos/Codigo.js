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

async function findUser() {
    const searchKey = document.getElementById('clBusqueda').value;
    try {
        const response = await fetch('http://localhost:3000/user');
        const users = await response.json();
        const filteredUsers = users.filter(user => user.uNombre === searchKey || user.uEmail === searchKey);
        if (filteredUsers.length > 0) {
            console.log('User found:', filteredUsers);
            document.getElementById('resBusqueda').innerText = JSON.stringify(filteredUsers, null, 2);
        } else {
            console.log('El usuario no está registrado');
            document.getElementById('resBusqueda').innerText = 'El usuario no está registrado';
        }
    } catch (error) {
        console.error('Error finding user:', error);
    }
}

async function deleteUser() {
    const elimUsuario = document.getElementById('elimUsuario').value;
    try {
        const response = await fetch(`http://localhost:3000/user/${elimUsuario}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            console.log('User deleted');
            fetchUsers();
        } else {
            console.error('Error deleting user:', response.statusText);
        }
    } catch (error) {
        console.error('Error deleting user:', error);
    }
}

document.addEventListener('DOMContentLoaded', fetchUsers);

