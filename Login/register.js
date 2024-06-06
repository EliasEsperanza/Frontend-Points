const formu = document.getElementById("form-register");

formu.addEventListener("submit", async function(event) {
    event.preventDefault();

    const nombre = nombreINP.value;
    const email = emailINP.value;
    const contra = contraINP.value;
    const dui = duiINP.value;
    const nrc = nrcINP.value;
    const telefono = TelINP.value;
    const direccion = direccionINP.value;
  
    try {
        const response = await fetch('http://localhost:3000/cliente', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombreCliente: nombre,
                dui: dui,
                nit: '',
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
