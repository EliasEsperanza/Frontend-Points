// Crear variables constantes
const nombreINP = document.getElementById("inp-nombre");
const emailINP = document.getElementById("inp-email");
const contraINP = document.getElementById("inp-contra");
const duiINP = document.getElementById("inp-dui");
const nrcINP = document.getElementById("inp-nrc");
const TelINP = document.getElementById("inp-telefono");
const direccionINP = document.getElementById("inp-Direccion");
const Formu = document.getElementById("form-register");
const btnRegistrar = document.getElementById("btn-registrar");

const navbar = document.getElementById("navbar-links");
const listaNav = document.getElementById("lista-link");


btnRegistrar.addEventListener("click", function(event){
    event.preventDefault();

    // Validar que ningún campo esté vacío
    if(nombreINP.value === '' || emailINP.value === '' || contraINP.value === '' ||
        duiINP.value === '' || nrcINP.value === '' || TelINP.value === '' || direccionINP.value === '') {
        Swal.fire({
            icon: 'warning',
            title: 'Campos vacíos',
            text: 'No se pueden agregar campos vacíos. Por favor, complete todos los campos.'
        });
        return; 
    }

    // Validar el formato del correo electrónico
    const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailFormat.test(emailINP.value)) {
        Swal.fire({
            icon: 'error',
            title: 'Formato de correo no valido',
            text: 'El formato del correo electrónico no es válido. Por favor, ingrese un correo electrónico válido.'
        });
        return; // Detener la ejecución si el formato del correo electrónico no es válido
    }

    // Validar la longitud mínima del DUI
    if (duiINP.value.length < 10) {
        Swal.fire({
            icon: 'error',
            title: 'Cantidad de caracteres de DUI insuficientes',
            text: 'El DUI debe tener al menos 10 caracteres.'
        });
        return; // Detener la ejecución si el DUI es demasiado corto
    }

    // Validar que el teléfono solo contenga números
    const phoneFormat = /^[0-9]+$/;
    if (!phoneFormat.test(TelINP.value)) {
        Swal.fire({
            icon: 'error',
            title: 'Ingreso de telefono incorrecto',
            text: 'El teléfono solo puede contener números.'
        });
        return; // Detener la ejecución si el teléfono contiene caracteres no numéricos
    }

    // Validar la longitud mínima de la contraseña
    if (contraINP.value.length < 6) {
        Swal.fire({
            icon: 'error',
            title: 'Caracteres insuficientes en la contraseña',
            text: 'La contraseña debe tener al menos 6 caracteres.'
        });
        return; // Detener la ejecución si la contraseña es demasiado corta
    }
    
    localStorage.setItem("Usuario","true");
    
    // Si todas las validaciones pasan, enviar el formulario
    Formu.submit();
    window.location.href = "/Inicio/html/index.html";    
});