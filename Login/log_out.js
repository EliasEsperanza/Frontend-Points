const enlace = document.getElementById("logout");
enlace.addEventListener("click", async function(){
    
    try{
        const idUsuario = localStorage.getItem("idUsuario");
        const idVendedor = localStorage.getItem("idUsuarioVendedor");
        const idAdmin = localStorage.getItem("idUsuarioAdmin");
        const jwt = localStorage.getItem("jwt");
        

        if (idUsuario) {
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

            localStorage.removeItem("idUsuario");
            localStorage.removeItem("jwt");
            console.log("destruyo los items...");
            location.replace("/Inicio/html/index.html");
        }else if(idVendedor){
            console.log("esta a punto de manda el metodo response");
            const response = await fetch('https://backend-points-production.up.railway.app/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    idUsuarioVendedor  : idVendedor,
                    userType: "vendedor"  
                })
            });

            localStorage.removeItem("idUsuarioVendedor");
            localStorage.removeItem("jwt");
            console.log("destruyo los items...");
            location.replace("/Inicio/html/index.html");

            //termina despues
        }else if(idAdmin){
            console.log("esta a punto de manda el metodo response");
            const response = await fetch('https://backend-points-production.up.railway.app/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    idUsuarioAdmin  : idAdmin,
                    userType: "admin"  
                })
            });

            localStorage.removeItem("idUsuarioAdmin");
            localStorage.removeItem("jwt");
            console.log("destruyo los items...");
            location.replace("/Inicio/html/index.html");
        }
        else{
            console.log("no se encuentra logueado de ninguna manera");
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