document.addEventListener("DOMContentLoaded", function() {
    const correo = document.getElementById("inp-correo");
    const pass = document.getElementById("inp-password");
    const formu = document.getElementById("Formu-login");

    formu.addEventListener("submit", function(event) {
        event.preventDefault();

        // Validar que ningún campo esté vacío
        if (correo.value.trim() === '' || pass.value.trim() === '') {
            Swal.fire({
                icon: 'warning',
                title: 'Campos vacíos',
                text: 'No se pueden agregar campos vacíos. Por favor, complete todos los campos.'
            });
            return; 
        }

        // Validar el formato del correo electrónico
        const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailFormat.test(correo.value)) {
            Swal.fire({
                icon: 'error',
                title: 'Correo inválido',
                text: 'El formato del correo electrónico no es válido. Por favor, ingrese un correo electrónico válido.'
            });
            return; // Detener la ejecución si el formato del correo electrónico no es válido
        }

        // Validar la longitud mínima de la contraseña
        if (pass.value.length < 6) {
            Swal.fire({
                icon: 'error',
                title: 'Contraseña demasiado corta',
                text: 'La contraseña debe contener como minimo 6 caracteres para mejorar su nivel de seguridad.'
            });
            return; // Detener la ejecución si la contraseña es demasiado corta
        }

        // Si todas las validaciones pasan, enviar el formulario
        formu.submit();
        window.location.href = "/Inicio/html/index.html";
    });
});
