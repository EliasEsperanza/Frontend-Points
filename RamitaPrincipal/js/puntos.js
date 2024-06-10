document.addEventListener("DOMContentLoaded", async function() {
    const idCliente = localStorage.getItem('idCliente');

    if (idCliente) {
        try {
            const response = await fetch(`https://backend-points-production.up.railway.app/cliente/${idCliente}`);

            if (!response.ok) {
                throw new Error('FALLO AL OBTENER EL ID');
            }

            const data = await response.json();

            // Assuming data.data contains the required user information
            const user = data.data;
            document.querySelector(".infoP h3:nth-of-type(1)").innerText = user.nombreCliente;
            document.querySelector(".infoP h3:nth-of-type(2)").innerText = user.dui;
            // Set other fields as necessary

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
