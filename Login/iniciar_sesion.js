document.addEventListener("DOMContentLoaded", function() {
    const formu = document.getElementById("Formu-login");

    formu.addEventListener("submit", async function(event) {
        event.preventDefault();

        const correo = document.getElementById("inp-correo").value;
        const password = document.getElementById("inp-password").value;
        
        // Validar que ningún campo esté vacío
        if (correo.trim() === '' || password.trim() === '') {
            Swal.fire({
                icon: 'warning',
                title: 'Campos vacíos',
                text: 'No se pueden agregar campos vacíos. Por favor, complete todos los campos.'
            });
            return; 
        }

        // Validar el formato del correo electrónico
        const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailFormat.test(correo)) {
            Swal.fire({
                icon: 'error',
                title: 'Correo inválido',
                text: 'El formato del correo electrónico no es válido. Por favor, ingrese un correo electrónico válido.'
            });
            return; // Detener la ejecución si el formato del correo electrónico no es válido
        }

        // Validar la longitud mínima de la contraseña
        if (password.length < 6) {
            Swal.fire({
                icon: 'error',
                title: 'Contraseña demasiado corta',
                text: 'La contraseña debe contener como mínimo 6 caracteres para mejorar su nivel de seguridad.'
            });
            return; // Detener la ejecución si la contraseña es demasiado corta
        }

        try {
            const response = await fetch('https://backend-points-production.up.railway.app/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    correo: correo,
                    password: password
                })
            });

            if (!response.ok) {
                throw new Error('Credenciales incorrectas');
            }

            const data = await response.json();
            const { token } = data;

            localStorage.setItem('jwt', token);

            Swal.fire({
                icon: 'success',
                title: 'Inicio de sesión exitoso',
                text: 'Has iniciado sesión correctamente.',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                window.location.href = "/Inicio/html/index.html";
            });

        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error al iniciar sesión',
                text: 'Ha ocurrido un error al intentar iniciar sesión. Por favor, verifique sus credenciales e inténtelo de nuevo.'
            });
        }
    });
});
