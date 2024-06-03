

window.addEventListener("scroll", function(){
    var header = document.querySelector("header");
    header.classList.toggle("sticky", window.scrollY>0);
})


// codigo para mostrar y ocultar el menú de navegación

document.addEventListener('DOMContentLoaded', function() {
  const toggleBtn = document.querySelector('.toggle_btn');
  const closeBtn = document.querySelector('.close_btn');
  const headerLinks = document.querySelector('.links');

  toggleBtn.addEventListener('click', () => {
      headerLinks.classList.toggle('show');
      closeBtn.style.display = 'block';
      toggleBtn.style.display = 'none';
  });

  closeBtn.addEventListener('click', () => {
      headerLinks.classList.toggle('show');
      closeBtn.style.display = 'none';
      toggleBtn.style.display = 'block';
  });

  
 // Función para actualizar la visibilidad del botón de toggle al cambiar el tamaño de la ventana
 function updateToggleVisibility() {
  if (window.innerWidth <= 992) {
      toggleBtn.style.display = 'block';
  } else {
      toggleBtn.style.display = 'none';
  }
}


updateToggleVisibility();
window.addEventListener('resize', updateToggleVisibility);
});