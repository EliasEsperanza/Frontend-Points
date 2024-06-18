const descripcion = document.getElementById("NombreNivel");
const puntosInicio = document.getElementById("PuntosInicio");
const puntosFin = document.getElementById("PuntosFin");
const icono = document.getElementById('adjunto');
const form_niveles = document.getElementById("form-Nivel");
form_niveles.addEventListener('submit', function (event) {
    event.preventDefault();


    const formData = new FormData();
    formData.append('descripcion', descripcion.value);
    formData.append('puntosInicio', puntosInicio.value);
    formData.append('puntosFin', puntosFin.value)
    formData.append('icono', icono.files[0]);

    axios.post('https://backend-points-production.up.railway.app/niveles', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
        .then(response => {
            console.log('Nivel creado exitosamente:', response.data);
            alert('Nivel creado exitosamente');

            formPremio.reset();
        })
        .catch(error => {
            console.error('Error al crear el nivel:', error);
            alert('Error al crear el Nivel');
        });
});
