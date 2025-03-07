document.addEventListener("DOMContentLoaded", function () {
    let btnCargar = document.getElementById("cargarUsuarios");
    let tablaUsuarios = document.getElementById("tablaUsuarios");

    // Función para obtener y mostrar usuarios
    function cargarUsuarios() {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((response) => response.json())
            .then((data) => {
                console.log(data);

                tablaUsuarios.innerHTML = ""; // Limpiar contenido previo
                data.forEach((usuario) => {
                    let fila = document.createElement("tr");

                    let columnaID = document.createElement("td");
                    columnaID.textContent = usuario.id;

                    let columnaNombre = document.createElement("td");
                    columnaNombre.textContent = usuario.name;

                    let columnaEmail = document.createElement("td");
                    columnaEmail.textContent = usuario.email;

                    let columnaAccion = document.createElement("td");
                    let botonEliminar = document.createElement("button");
                    botonEliminar.textContent = "Eliminar";
                    botonEliminar.classList.add("btn", "btn-danger", "btn-sm");

                    // Evento para eliminar usuario con API DELETE
                    botonEliminar.addEventListener("click", function () {
                        eliminarUsuario(usuario.id, fila);
                    });

                    columnaAccion.appendChild(botonEliminar);
                    fila.appendChild(columnaID);
                    fila.appendChild(columnaNombre);
                    fila.appendChild(columnaEmail);
                    fila.appendChild(columnaAccion);
                    tablaUsuarios.appendChild(fila);
                });
            })
            .catch((error) => console.error("Error al obtener los usuarios:", error));
    }

    // Función para eliminar usuario con API DELETE
    function eliminarUsuario(id, fila) {
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
            method: "DELETE",
        })
            .then((response) => {
                if (response.ok) {
                    fila.remove(); // Eliminar visualmente la fila
                    console.log(`Usuario con ID ${id} eliminado`);
                    console.log(response);
                } else {
                    console.error("Error al eliminar el usuario");
                }
            })
            .catch((error) => console.error("Error en la solicitud DELETE:", error));
    }

    // Evento para cargar usuarios al hacer clic en el botón
    btnCargar.addEventListener("click", cargarUsuarios);
});
