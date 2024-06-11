const enlace = document.getElementById("logout");
enlace.addEventListener("click", async function(){
    
    try{
        const idCliente = localStorage.getItem("idCliente");
        const idVendedor = localStorage.getItem("idVendedor");
        const idAdmin = localStorage.getItem("idAdmin");
        const jwt = localStorage.getItem("jwt");
        

        if (idCliente) {
            console.log("llego aca en log_out.js");
            const clientResponse = await fetch(`https://backend-points-production.up.railway.app/cliente/${idCliente}`);
            if (!clientResponse.ok) {
                throw new Error('Fallo al obtener el ID del cliente');
            }
            const clientData = await clientResponse.json();
            const client = clientData.data;
            const userResponse2 = await fetch(`https://backend-points-production.up.railway.app/usuarios`);
            const userDataV = await userResponse2.json();
            const user2 = userDataV.data;
            let varid;
            for (let index = 0; index < user2.length; index++) {
                if(user2[index].idCliente == client.idCliente){
                    varid = user2[index].idUsuario;
                }
                
            }
            const idUsuario = varid;
            if (!idUsuario) {
                throw new Error('ID de usuario no encontrado en los datos del cliente');
            }
            console.log("esta a punto de manda el metodo response");
            const response = await fetch('https://backend-points-production.up.railway.app/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    idUsuario: idUsuario,
                    userType: "cliente"  
                })
            });

            localStorage.removeItem("idCliente");
            localStorage.removeItem("jwt");
            console.log("destruyo los items...");
            location.replace("/Inicio/html/index.html");
        }else if(idVendedor){
            const vendedoreponse = await fetch(`https://backend-points-production.up.railway.app/vendedor`);
            if (!clientResponse.ok) {
                throw new Error('Fallo al obtener el ID del cliente');
            }
            const vendedorData = vendedoreponse.json();
            const vendedor = vendedorData.data;
            //termina despues
        }else if(idAdmin){

        }
        /*const response = await fetch('https://backend-points-production.up.railway.app/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                correo: ,
                password: 
            })
        });*/
    }catch(error){

    }
});