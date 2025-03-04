document.addEventListener("DOMContentLoaded", () => {
  let botonRojo = document.getElementById("agregarRojo");
  let botonAzul = document.getElementById("agregarAzul");
  let contador = 1;

  function agregarTitulo(colorClase) {
    let texto = document.getElementById("textoInput").value.trim();

    if (texto !== "") {
      let nuevoTitulo = document.createElement("h1");
      nuevoTitulo.textContent = texto;
      nuevoTitulo.classList.add(colorClase); // Agregar clase según el botón presionado
      nuevoTitulo.id = "title" + contador;
      if (nuevoTitulo.id === "title2") {
        nuevoTitulo.classList.add("color_verde");
      }
      contador++;
      let contenedor = document.getElementById("contenedorTitulos");
      contenedor.appendChild(nuevoTitulo);

      document.getElementById("textoInput").value = ""; // Limpiar campo
    }
  }

  botonRojo.addEventListener("click", () => {
    agregarTitulo("color_rojo");
  });

  botonAzul.addEventListener("click", () => {
    agregarTitulo("color_azul");
  });
});
