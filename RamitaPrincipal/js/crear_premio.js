document.addEventListener('DOMContentLoaded', function() {
    const formPremio = document.getElementById('formPremio');
    const nombrePremioInput = document.getElementById('NombrePremio');
    const nivelPremioSelect = document.getElementById('NombrenivelPremio');
    const imagenInput = document.getElementById('adjuntoPremio');
    const puntosInput = document.getElementById('PuntosPremio');
    const estadoPremioSelect = document.getElementById('estadoPremio');
    const descripcionInput = document.getElementById('descripPremio');
    const submitButton = document.querySelector('.container-Form-Premio .btn-F');

    function loadNiveles() {
        axios.get('https://backend-points-production.up.railway.app/niveles')
            .then(response => {
                const niveles = response.data.data;
                niveles.forEach(nivel => {
                    const option = document.createElement('option');
                    option.value = nivel.idNivel;
                    option.textContent = nivel.descripcion;
                    nivelPremioSelect.appendChild(option);
                });
            })
            .catch(error => {
                console.error('Error al obtener los niveles:', error);
                alert('Error al cargar los niveles');
            });
    }

    loadNiveles();

    formPremio.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData();
        formData.append('nombrePremio', nombrePremioInput.value);
        formData.append('idNivel', nivelPremioSelect.value);
        formData.append('imagen', imagenInput.files[0]); 
        formData.append('puntos', puntosInput.value);
        formData.append('estado', estadoPremioSelect.value);
        formData.append('descripcion', descripcionInput.value);

        axios.post('https://backend-points-production.up.railway.app/premio', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            console.log('Premio creado exitosamente:', response.data);
            alert('Premio creado exitosamente');
           
            formPremio.reset();
        })
        .catch(error => {
            console.error('Error al crear el premio:', error);
            alert('Error al crear el premio');
        });
    });
});

