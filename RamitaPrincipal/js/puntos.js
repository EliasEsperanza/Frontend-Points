document.addEventListener("DOMContentLoaded", async function() {
    const idCliente = localStorage.getItem('idCliente');
    console.log('idCliente from localStorage:', idCliente);

    if (idCliente) {
        try {
            // Fetch client data
            
            const clientResponse = await fetch(`https://backend-points-production.up.railway.app/cliente/${idCliente}`);
            //console.log('API URL:', `https://backend-points-production.up.railway.app/cliente/${idCliente}`);
            
            if (!clientResponse.ok) {
                throw new Error('Fallo al obtener el ID del cliente');
            }

            const clientData = await clientResponse.json();
            //console.log('Datos del cliente:', clientData);

            const client = clientData.data;
            document.getElementById("Nombre-Usuario").innerText = client.nombreCliente;
            document.getElementById("Nombre-Dui").innerText = client.dui;

            // Fetch user points and level using idUsuario
             // Verifica que client tenga idUsuario
            

            const userResponse2 = await fetch(`https://backend-points-production.up.railway.app/usuarios`);
            const userDataV = await userResponse2.json();
            const user2 = userDataV.data;
            let varid =0;
            for (let index = 0; index < user2.length; index++) {
                if(user2[index].idCliente == client.idCliente){
                    varid = user2[index].idUsuario;
                }
                
            }
            const idUsuario = varid;
            if (!idUsuario) {
                throw new Error('ID de usuario no encontrado en los datos del cliente');
            }

            const userResponse = await fetch(`https://backend-points-production.up.railway.app/usuarios/${idUsuario}`);
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
                document.getElementById("Puntos-Usuario").innerText = puntosUsuario;

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
                document.getElementById("Nivel-Usuario").innerText = nivelDescripcion;
                const dolares = user.puntos*5;


                document.getElementById("Puntos-Dinero-Usuario").innerText = dolares;

                ///Toca sacar las ventas referente a ese usuario y los canje referente a ese usuario

                const ventasResponse = await fetch('https://backend-points-production.up.railway.app/ventas');
                const ventadata = await ventasResponse.json();
                const ventas = ventadata.map((ventas) => ventas);

                console.log(ventadata, " ", ventas);
                
                if(ventas) {
                    let venta =[];
                    console.log(ventas);
                    for (let index = 0; index < ventas.length; index++) {
                        if (ventas[index].idCliente == user.idCliente) {
                            venta.push(ventas[index]);
                        }
                    }
                    
                    var UltimaVenta = {};
    
                    for (let index = 0; index < venta.length; index++) {
                        UltimaVenta = venta[index];
                        
                    }
                    console.log(UltimaVenta);
                    const sucursalResponse = await fetch(`https://backend-points-production.up.railway.app/sucursal/${UltimaVenta.idSucursal}`);
                    const sucursaldata = await sucursalResponse.json();
                    
                    
                    document.getElementById("Sucursal-Historial-Acumulacion").innerText =sucursaldata.nombreSucursal ;
                    document.getElementById("Numero-Factura").innerText = UltimaVenta.numeroFactura;
                    document.getElementById("Puntos-Entrada").innerText = UltimaVenta.puntosGanados;
                    document.getElementById("Conversion-puntos-dolares").innerText = UltimaVenta.puntosGanados*5;
                    document.getElementById("Fecha").innerText = UltimaVenta.fechaVenta;
    
                }
                else{
                    document.getElementById("Sucursal-Historial-Acumulacion").innerText = "null" ;
                    document.getElementById("Numero-Factura").innerText = "null";
                    document.getElementById("Puntos-Entrada").innerText = "null";
                    document.getElementById("Conversion-puntos-dolares").innerText = "null";
                    document.getElementById("Fecha").innerText = "null";
                }
                

                const canjeResponse = await await fetch('https://backend-points-production.up.railway.app/canjes');
                const canjedata = await canjeResponse.json();
                const canje = canjedata.data;
                let canjes = [];

                if (canje && canje.length > 0){
                    for (let index = 0; index < canje.length; index++) {
                        if (canje[index].idCliente == user.idCliente) {
                            canjes.push(canje[index]);
                        }
                    }

                    var UltimoCanje;

                    for (let index = 0; index < canje.length; index++) {
                        UltimoCanje = canje[index];
                    }

                    const sucursalResponse = await fetch(`https://backend-points-production.up.railway.app/sucursal/${UltimoCanje.idSucursal}`);
                    const sucursaldata = await sucursalResponse.json();
                    const sucursal = sucursaldata.data;

                    const premioResponse = await fetch(`https://backend-points-production.up.railway.app/sucursal/${UltimoCanje.idPremio}`);
                    const premiodata = await premioResponse.json();
                    const premio = premiodata.data;

                    document.getElementById("Sucursal-Historial-Canjeados").innerText = sucursal.nombreSucursal ;
                    document.getElementById("Puntos-Canjeados").innerText = canje.puntosCanjeados;
                    document.getElementById("Conversio-Dolares-Canjeados").innerText = canje.puntosCanjeados*5;
                    document.getElementById("Nombre-Premio").innerText = premio.nombrePremio;
                    document.getElementById("Fecha-Premio-Canjeado").innerText = canje.Canje;
                }else{
                    document.getElementById("Sucursal-Historial-Canjeados").innerText = "null" ;
                    document.getElementById("Puntos-Canjeados").innerText = "null";
                    document.getElementById("Conversio-Dolares-Canjeados").innerText = "null";
                    document.getElementById("Nombre-Premio").innerText = "null";
                    document.getElementById("Fecha-Premio-Canjeado").innerText = "null";
                }

                
            } else {
                throw new Error('Datos de usuario no disponibles');
            }

        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: `Ha ocurrido un error ${error}`
            });
        }
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Usuario no encontrado',
            text: 'No se encontró el ID del usuario. Por favor, inicie sesión nuevamente.'
        }).then(() => {
            window.location.href = "/Login/index.html";  
        });
    }
});
