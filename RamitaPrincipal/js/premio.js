document.addEventListener("DOMContentLoaded", async function(){
    const idCliente = localStorage.getItem("idUsuario");

    if (idCliente) {
        try {
        // Fetch client data
            
        
        const userResponse = await fetch(`https://backend-points-production.up.railway.app/usuarios/${idCliente}`);
        //console.log('API URL:', `https://backend-points-production.up.railway.app/usuarios/${idUsuario}`);
        
        if (!userResponse.ok) {
            throw new Error('Fallo al obtener el ID del usuario');
        }

        const userData = await userResponse.json();
        //console.log('Datos del usuario:', userData);

        const user = userData.data;

        if (user) {
            const puntosUsuario = user.puntos;
            const idNivel = user.idNivel;

            // Set the points
            //document.getElementById("Puntos-Usuario").innerText = puntosUsuario;

            // Fetch the level description
            const levelResponse = await fetch(`https://backend-points-production.up.railway.app/niveles`);
            if (!levelResponse.ok) {
                throw new Error('Fallo al obtener los niveles');
            }

            const levelData = await levelResponse.json();
            //console.log('Datos de niveles:', levelData);

            const levels = levelData.data;
            const userLevel = levels.find(level => level.idNivel === idNivel);
            const nivelDescripcion = userLevel ? userLevel.descripcion : 'Nivel desconocido';

            // Set the level description
            //document.getElementById("Nivel-Usuario").innerText = nivelDescripcion;
            //console.log("el nivel del usuario es:", userLevel);
            console.log("corrio hasta aca 1");
            /*Codigo para modificar el acceso del cliente con respecto al nivel guardado NO TOCAR*/
            for (let index = 0; index < levels.length; index++) {
                /*if (levels[index].descripcion == userLevel.descripcion ) {
                    
                    
                }*/
                if(index == 0){
                    document.getElementById("Rpuntos-bronce").innerText = levels[index].puntosInicio + "-"+ levels[index].puntosFin + " puntos"; 
                }else if(index == 1){
                    document.getElementById("Rpuntos-plata").innerText = levels[index].puntosInicio + "-"+ levels[index].puntosFin + " puntos";
                }else if(index == 2){
                    document.getElementById("Rpuntos-oro").innerText = levels[index].puntosInicio + "-"+ levels[index].puntosFin + " puntos";
                }else if(index == 3){
                    document.getElementById("Rpuntos-premium").innerText = levels[index].puntosInicio + "-"+ levels[index].puntosFin + " puntos";
                }
            }
            console.log("corrio hasta aca 2");
        if(userLevel.descripcion == "nivel 1"){
            /*Opcion A se le baja la opacidad y se le quita sus evento a los otros premios*/
            const padre1 = document.getElementById("plata-container");
            const padre2 = document.getElementById("oro-container");
            const padre3 = document.getElementById("premium-container");
            const hijo1 = padre1.querySelectorAll('*');
            const hijo2 = padre2.querySelectorAll('*');
            const hijo3 = padre3.querySelectorAll('*');
            
            
            hijo1.forEach(elemento => {
                elemento.classList.add('disabled');
            });
            hijo2.forEach(elemento => {
                elemento.classList.add('disabled');
            });
            hijo3.forEach(elemento => {
                elemento.classList.add('disabled');
            });
            /* Opcion 2 se le quita por completo la otros niveles para que no quede feo el espacio en blanco
            document.getElementById("plata-container").remove();
            document.getElementById("oro-container").remove();
            document.getElementById("premium-container").remove();
            */
            
        } else if( userLevel.descripcion == "nivel 2"){
            /*Opcion A se le baja la opacidad y se le quita sus evento a los otros premios*/
            const padre1 = document.getElementById("bronce-container");
            const padre2 = document.getElementById("oro-container");
            const padre3 = document.getElementById("premium-container");
            const hijo1 = padre1.querySelectorAll('*');
            const hijo2 = padre2.querySelectorAll('*');
            const hijo3 = padre3.querySelectorAll('*');
            
            
            hijo1.forEach(elemento => {
                elemento.classList.add('disabled');
            });
            hijo2.forEach(elemento => {
                elemento.classList.add('disabled');
            });
            hijo3.forEach(elemento => {
                elemento.classList.add('disabled');
            });
            /* Opcion 2 se le quita por completo la otros niveles para que no quede feo el espacio en blanco
            document.getElementById("plata-container").remove();
            document.getElementById("oro-container").remove();
            document.getElementById("premium-container").remove();
            */
        } else if(userLevel.descripcion == "nivel 3"){
            /*Opcion A se le baja la opacidad y se le quita sus evento a los otros premios*/
            const padre1 = document.getElementById("bronce-container");
            const padre2 = document.getElementById("plata-container");
            const padre3 = document.getElementById("premium-container");
            const hijo1 = padre1.querySelectorAll('*');
            const hijo2 = padre2.querySelectorAll('*');
            const hijo3 = padre3.querySelectorAll('*');
            
            
            hijo1.forEach(elemento => {
                elemento.classList.add('disabled');
            });
            hijo2.forEach(elemento => {
                elemento.classList.add('disabled');
            });
            hijo3.forEach(elemento => {
                elemento.classList.add('disabled');
            });
            /* Opcion 2 se le quita por completo la otros niveles para que no quede feo el espacio en blanco
            document.getElementById("plata-container").remove();
            document.getElementById("oro-container").remove();
            document.getElementById("premium-container").remove();
            */

        }
        else if(userLevel.descripcion == "nivel 4"){
            /*Opcion A se le baja la opacidad y se le quita sus evento a los otros premios*/
            const padre1 = document.getElementById("bronce-container");
            const padre2 = document.getElementById("oro-container");
            const padre3 = document.getElementById("plata-container");
            const hijo1 = padre1.querySelectorAll('*');
            const hijo2 = padre2.querySelectorAll('*');
            const hijo3 = padre3.querySelectorAll('*');
            
            
            hijo1.forEach(elemento => {
                elemento.classList.add('disabled');
            });
            hijo2.forEach(elemento => {
                elemento.classList.add('disabled');
            });
            hijo3.forEach(elemento => {
                elemento.classList.add('disabled');
            });
            /* Opcion 2 se le quita por completo la otros niveles para que no quede feo el espacio en blanco
            document.getElementById("plata-container").remove();
            document.getElementById("oro-container").remove();
            document.getElementById("premium-container").remove();
            */

        }


            //document.getElementById("Puntos-Dinero-Usuario").innerText = dolares;

            //Iniciar aca

        
        }


            
        } catch (error) {
            
        }
    }
    
    

});