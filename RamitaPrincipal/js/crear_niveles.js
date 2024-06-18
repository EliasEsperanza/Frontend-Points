const form_niveles = document.getElementById("form-Nivel");
    form_niveles.addEventListener('submit', function(event){
        event.preventDefault();
        try {

            const descripcion = document.getElementById("NombreNivel").textContent;
            const puntosInicio = document.getElementById("PuntosInicio").textContent;
            const puntosFin = document.getElementById("PuntosFin").textContent;
            const icono = document.getElementById("adjunto").files[0];
            //ingresa el nuevo nivel
            if(icono){
                console.log('Hay icono');
            }
            /*const response = await fetch(`https://backend-points-production.up.railway.app/niveles`,{
                method:'POST',
                body: JSON.stringify({
                    descripcion:descripcion,
                    puntosInicio:puntosInicio,
                    puntosFin:puntosFin,
                    icono:icono
                })
            });*/
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error al enviar nivel',
                text: `Ha ocurrido un error .Detalle: ${error.message}`
            });
        }
    });

