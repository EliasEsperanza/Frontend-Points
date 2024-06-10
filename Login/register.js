const formu = document.getElementById("form-register");

formu.addEventListener("submit", async function (event) {
    event.preventDefault();

    const nombre = document.getElementById("inp-nombre").value.trim();
    const email = document.getElementById("inp-email").value.trim();
    const contra = document.getElementById("inp-contra").value.trim();
    const dui = document.getElementById("inp-dui").value.trim();
    const nrc = document.getElementById("inp-nrc").value.trim();
    const nit = document.getElementById("inp-nit").value.trim();
    const telefono = document.getElementById("inp-telefono").value.trim();
    const direccion = document.getElementById("inp-Direccion").value.trim();

    // Validar que ningún campo esté vacío
    if (nombre === '' || email === '' || contra === '' || dui === '' || nrc === '' || nit === '' || telefono === '' || direccion === '') {
        Swal.fire({
            icon: 'warning',
            title: 'Campos vacíos',
            text: 'No se pueden agregar campos vacíos. Por favor, complete todos los campos.'
        });
        return;
    }

    // Validar el formato del correo electrónico
    const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailFormat.test(email)) {
        Swal.fire({
            icon: 'error',
            title: 'Correo inválido',
            text: 'El formato del correo electrónico no es válido. Por favor, ingrese un correo electrónico válido.'
        });
        return;
    }

    // Validar la longitud mínima de la contraseña
    if (contra.length < 6) {
        Swal.fire({
            icon: 'error',
            title: 'Contraseña demasiado corta',
            text: 'La contraseña debe contener como mínimo 6 caracteres para mejorar su nivel de seguridad.'
        });
        return;
    }

    // Validar el formato del DUI (ejemplo: 00000000-0)
    const duiFormat = /^\d{8}-\d$/;
    if (!duiFormat.test(dui)) {
        Swal.fire({
            icon: 'error',
            title: 'DUI inválido',
            text: 'El formato del DUI no es válido. Por favor, ingrese un DUI válido (ejemplo: 00000000-0).'
        });
        return;
    }

    // Validar el formato del NIT (ejemplo: 0000-000000-000-0)
    const nitFormat = /^\d{4}-\d{6}-\d{3}-\d$/;
    if (!nitFormat.test(nit)) {
        Swal.fire({
            icon: 'error',
            title: 'NIT inválido',
            text: 'El formato del NIT no es válido. Por favor, ingrese un NIT válido (ejemplo: 0000-000000-000-0).'
        });
        return;
    }

    // Validar el formato del teléfono (ejemplo: 0000-0000)
    const telefonoFormat = /^\d{4}-\d{4}$/;
    if (!telefonoFormat.test(telefono)) {
        Swal.fire({
            icon: 'error',
            title: 'Teléfono inválido',
            text: 'El formato del teléfono no es válido. Por favor, ingrese un número de teléfono válido (ejemplo: 0000-0000).'
        });
        return;
    }

    /*Consumir las apis*/
    try {
        const response = await fetch('https://backend-points-production.up.railway.app/cliente', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            //Pasarle datos a los campos de la tabla atravez de los inputs
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
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al registrar el cliente');
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
            text: `Ha ocurrido un error al intentar registrar el cliente. Por favor, inténtelo de nuevo más tarde. Detalle: ${error.message}`
        });
    }
});
