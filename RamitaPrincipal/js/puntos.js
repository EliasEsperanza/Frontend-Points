document.addEventListener("DOMContentLoaded", async function() {
    const idCliente = localStorage.getItem('idCliente');
    console.log('idCliente from localStorage:', idCliente);

    if (idCliente) {
        try {
            // Fetch client data
            const clientResponse = await fetch(`https://backend-points-production.up.railway.app/cliente/${idCliente}`);
            console.log('API URL:', `https://backend-points-production.up.railway.app/cliente/${idCliente}`);
            
            if (!clientResponse.ok) {
                throw new Error('Fallo al obtener el ID del cliente');
            }

            const clientData = await clientResponse.json();
            console.log('Datos del cliente:', clientData);

            const client = clientData.data;
            document.getElementById("Nombre-Usuario").innerText = client.nombreCliente;
            document.getElementById("Nombre-Dui").innerText = client.dui;

            // Fetch user points and level using idUsuario
            const idUsuario = client.idUsuario; // Verifica que client tenga idUsuario
            if (!idUsuario) {
                throw new Error('ID de usuario no encontrado en los datos del cliente');
            }

            const userResponse = await fetch(`https://backend-points-production.up.railway.app/usuarios/${idUsuario}`);
            console.log('API URL:', `https://backend-points-production.up.railway.app/usuarios/${idUsuario}`);
            
            if (!userResponse.ok) {
                throw new Error('Fallo al obtener el ID del usuario');
            }

            const userData = await userResponse.json();
            console.log('Datos del usuario:', userData);

            const user = userData.data;

            if (user) {
                const puntosUsuario = user.puntos;
                const idNivel = user.idNivel;

                // Set the points
                document.getElementById("Puntos-Usuario").innerText = puntosUsuario;

                // Fetch the level description
                const levelResponse = await fetch(`https://backend-points-production.up.railway.app/niveles`);
                if (!levelResponse.ok) {
                    throw new Error('Fallo al obtener los niveles');
                }

                const levelData = await levelResponse.json();
                console.log('Datos de niveles:', levelData);

                const levels = levelData.data;
                const userLevel = levels.find(level => level.idNivel === idNivel);
                const nivelDescripcion = userLevel ? userLevel.descripcion : 'Nivel desconocido';

                // Set the level description
                document.getElementById("Nivel-Usuario").innerText = nivelDescripcion;
            } else {
                throw new Error('Datos de usuario no disponibles');
            }

        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error al obtener datos del usuario',
                text: 'Ha ocurrido un error al intentar obtener los datos del usuario. Por favor, intente nuevamente.'
            });
        }
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Usuario no encontrado',
            text: 'No se encontró el ID del usuario. Por favor, inicie sesión nuevamente.'
        }).then(() => {
            window.location.href = "/Login/index.html";  
        });
    }
});
