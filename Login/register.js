const formu = document.getElementById("form-register");

formu.addEventListener("submit", async function(event) {
    event.preventDefault();

    const nombre = document.getElementById("inp-nombre").value;
    const email = document.getElementById("inp-email").value;
    const contra = document.getElementById("inp-contra").value;
    const dui = document.getElementById("inp-dui").value;
    const nrc = document.getElementById("inp-nrc").value;
    const nit = document.getElementById("inp-nit").value;
    const telefono = document.getElementById("inp-telefono").value;
    const direccion = document.getElementById("inp-Direccion").value;
  
    try {
        const response = await fetch('https://backend-points-production.up.railway.app/cliente', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombreCliente: nombre,
                dui: dui,
                nit: nit,
                nrc: nrc,
                telefono: telefono,
                direccion: direccion,
                correo: email,
                idCategoriaCliente: 1,
                idTipoCliente: 1,
                passwordHash: contra
            })
        });

        if (!response.ok) {
            throw new Error('Error al registrar el cliente');
        }

        const data = await response.json();
        console.log(data); 

       
        if (data.token) {
            localStorage.setItem('jwt', data.token);
        }

        Swal.fire({
            icon: 'success',
            title: 'Registro exitoso',
            text: 'Te has registrado correctamente.',
            showConfirmButton: false,
            timer: 1500
        }).then(() => {
            window.location.href = "/Inicio/html/index.html";
        });

    } catch (error) {
        console.error('Error:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error al registrar el cliente',
            text: 'Ha ocurrido un error al intentar registrar el cliente. Por favor, inténtelo de nuevo más tarde.'
        });
    }
});
