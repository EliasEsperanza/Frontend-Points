window.onload = function() {
    document.body.addEventListener('click', function(event) {
        const enlace = document.getElementById("logout");
        if (enlace) {
            enlace.addEventListener('click', async function(event) {
                event.preventDefault(); // Evitar comportamiento por defecto del enlace

                try {
                    const idUsuario = localStorage.getItem("idUsuario");
                    const idVendedor = localStorage.getItem("idUsuarioVendedor");
                    const idAdmin = localStorage.getItem("idUsuarioAdmin");
                    const jwt = localStorage.getItem("jwt");

                    let endpoint = '';
                    let bodyData = {};

                    if (idUsuario) {
                        endpoint = 'https://backend-points-production.up.railway.app/logout';
                        bodyData = {
                            idUsuario: idUsuario,
                            userType: "cliente"  
                        };
                        localStorage.removeItem("idUsuario");
                    } else if (idVendedor) {
                        endpoint = 'https://backend-points-production.up.railway.app/logout';
                        bodyData = {
                            idUsuarioVendedor: idVendedor,
                            userType: "vendedor"  
                        };
                        localStorage.removeItem("idUsuarioVendedor");
                    } else if (idAdmin) {
                        endpoint = 'https://backend-points-production.up.railway.app/logout';
                        bodyData = {
                            idUsuarioAdmin: idAdmin,
                            userType: "admin"  
                        };
                        localStorage.removeItem("idUsuarioAdmin");
                    } else {
                        console.log("No se encuentra logueado de ninguna manera");
                        return;
                    }

                    const response = await fetch(endpoint, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(bodyData)
                    });

                    localStorage.removeItem("jwt");
                    console.log("Se han eliminado los items del localStorage.");
                    location.replace("/Inicio/html/index.html");
                } catch (error) {
                    console.error("Error al realizar el logout:", error);
                }
            });
        } else {
            console.warn("Elemento con id 'logout' no encontrado.");
        }
    });
};

