document.addEventListener("DOMContentLoaded", () => {
    const editButton = document.querySelector(".btn-editar input");
    const saveButton = document.createElement("input");
    saveButton.type = "submit";
    saveButton.value = "Guardar";
    saveButton.style.color = "white";
    saveButton.style.backgroundColor = "green";
    saveButton.style.display = "none";
    document.querySelector(".botones").appendChild(saveButton);
  
    editButton.addEventListener("click", () => {
      toggleEditable(true);
      editButton.style.display = "none";
      saveButton.style.display = "inline-block";
    });
  
    saveButton.addEventListener("click", async (event) => {
      event.preventDefault(); // Evita el envío del formulario si es necesario
      const idCliente = localStorage.getItem("idCliente");
      const token = localStorage.getItem("jwt");
  
      if (!token) {
        console.error("No token found, redirecting to login...");
        window.location.href = "/Login/index.html";
        return;
      }
  
      const updatedUser = {
        nombreCliente: document.querySelector(".nametxt").textContent.trim(),
        correo: document.querySelector(".emailtxt").textContent.trim(),
        passwordHash: document.querySelector(".passwordtxt").textContent.trim(),
        dui: document.querySelector(".duitxt").textContent.trim(),
        nit: document.querySelector(".nittxt").textContent.trim(),
        nrc: document.querySelector(".nrctxt").textContent.trim(),
        telefono: document.querySelector(".teltxt").textContent.trim(),
        direccion: document.querySelector(".direcciontxt").textContent.trim(),
      };
  
      console.log("Datos actualizados:", updatedUser); // Para verificar antes de enviar
  
      try {
        const response = await fetch(
          `https://backend-points-production.up.railway.app/cliente/${idCliente}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`, // Agrega el token de autorización
            },
            body: JSON.stringify(updatedUser),
          }
        );
  
        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error del servidor:", errorData);
          throw new Error("Failed to update user data");
        }
  
        const data = await response.json();
        console.log("Update successful:", data);
        toggleEditable(false);
        saveButton.style.display = "none";
        editButton.style.display = "inline-block";
      } catch (error) {
        console.error("Error:", error);
      }
    });
  
    function toggleEditable(isEditable) {
      const fields = document.querySelectorAll(".txt-estl");
      fields.forEach(field => {
        field.contentEditable = isEditable.toString();
        field.style.border = isEditable ? "1px solid #000" : "none";
      });
    }
  });
  