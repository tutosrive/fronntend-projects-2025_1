/**
 * Generar un elemento HTML
 * @param {String} tag Nombre de la etiquete del elemento HTML ("p", "div", "span", e.t.c)
 * @param {String} classes Las clases que se desean agregar al elemento, **separadas por espacios**
 * @param {String} content Contenido que se desea agregar (String con sintaxis HTML)
 * @param {Object} attributes Atributos adicionales de configuración
 * @returns {{HTML: HTMLElement, str_html: String}}
 */
export function generate_element(tag, classes, content = "", attributes = null) {
    const element = document.createElement(tag);
    // TagName erróneo
    if (element instanceof HTMLUnknownElement) return null;
    // Agregar clases cortadas por los espacios ("btn btn-primary" = ["btn", "btn-primary"])
    if (classes) classes.split(" ").forEach((cls) => element.classList.add(cls));
    if (content) element.innerHTML = content;
    // Agregar atributos
    if (attributes) {
        for (let key in attributes) element.setAttribute(key, attributes[key]);
    }
    return { HTML: element, str_html: element.outerHTML };
}

/**
 * Generar un MODAL con información
 * @param {String} title Título del MODAL
 * @param {String} content Contenido del MODAL, puede contener HTML
 * @param {String} footer_btn_txt Texto que tendrá el botón del footer del MODAL
 * @returns {String} MODAL con las configuraciones
 */
function __modal_generator(title, content, footer_btn_txt) {
    return `
    <div class="modal fade" id="prompter-modal" tabindex="-1" aria-labelledby="prompter-modalLabel">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5">${title}</h1>
                    <button class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body text-center">
                    ${content}
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary" data-bs-dismiss="modal">${footer_btn_txt}</button>
                </div>
            </div>
        </div>
    </div>`;
}

/**
 * Generar y ejecutar eventos de MODAL para pedir el tamaño de cuadrícula al usuario
 */
export function generate_modal_get_size_grid() {
    const ctn_prompter = document.querySelector("#prompter");
    const config = { id: "btn-prompter", "data-bs-toggle": "modal", "data-bs-target": "#prompter-modal" };
    const btn_active = generate_element("button", "", "", config).HTML;
    const modal_content = `<label>Ingrese el tamaño de cuadrícula:</label>
                    <input id="size-grid" type="number" placeholder="(3, 5, 7)" min="3" max="7" step="2" oninput="this.value = this.value.replace(/[^357]/g, '')">
                    <p><span id="spn-error-size" class="text-danger"></span></p>`;
    // Crear MODAL
    const modal = __modal_generator("Bienvenido a <span class ='text-info'>TRIKI</span>", modal_content, "Aceptar");
    ctn_prompter.insertAdjacentHTML("beforeend", modal);
    ctn_prompter.appendChild(btn_active);
    document.querySelector("#btn-prompter").click();
    ctn_prompter.removeChild(btn_active);
    // Agregar el modal al prompter
    // Limpiar prompter DIV
    document.querySelectorAll("[data-bs-dismiss]").forEach((btn) => {
        btn.addEventListener("click", () => {
            const inp = document.querySelector("#size-grid");
            if (inp.value) {
                window.size_value_grid = inp.value;
                const event = new Event("correct_size_grid");
                document.dispatchEvent(event);
                ctn_prompter.appendChild(btn_active);
                document.querySelector("#btn-prompter").click();
                document.querySelector("#again").classList.remove("visually-hidden");
                ctn_prompter.innerHTML = "";
            } else {
                document.querySelector("#spn-error-size").textContent = "Debe ingresar un tamaño ya sea 3, 5 o 7";
            }
        });
    });
}

/**
 * Generar la cuadrícula de tamaño N y agregar al contendor espcificado
 * @param {Number} size Tamaño de la cuadrícula
 * @param {HTMLElement} container Contenedor HTML de la cuadrícula
 */
export function generate_grid(size, container) {
    // Clase de bootstrap con un ancho según "size"
    let width_grid_container = size === 3 ? "w-25" : "w-50";
    // String con sintaxis HTML que contendrá las filas y sus inputs
    let elements = "";
    // Generar "filas" y "columnas"
    for (let i = 0; i < size; i++) {
        let row_inputs = ""; // Filas
        for (let j = 0; j < size; j++) {
            const column = generate_element("input", "w-100 inp-grid align-items-center", "", {
                id: `inp-${i}-${j}`, // identificado con fila (i) y columna (j)
                "data-box-grid": `${i}:${j}`,
                "data-row-position": i, // Identificador de fila
                "data-col-position": j, // Identificador de columna
                type: "text",
                maxlength: "1",
                oninput: "this.value = this.value.replace(/[^oO]/g, '')",
                autocomplete: "off",
            }).str_html;
            // Agregar columna a la fila
            row_inputs += generate_element("div", "col p-0 mx-1 mt-2", column).str_html;
        }
        // Agregar fila al String de elementos
        elements += generate_element("div", `row p-0 mx-0`, row_inputs).str_html;
    }
    container.classList.add(width_grid_container);
    // Agregar elementos a la página
    container.innerHTML = elements;
}

/**
 * Mostrar MODAL indicando el ganador del juego
 * @param {String} name_player Nombre del jugador
 */
export function winner_modal(name_player) {
    const ctn_prompter = document.querySelector("#prompter");
    const config = { id: "btn-prompter", "data-bs-toggle": "modal", "data-bs-target": "#prompter-modal" };
    const btn_active = generate_element("button", "", "", config).HTML;
    const modal_content = `<h1 class="text-success">¡Felicitaciones jugador "${name_player}", has ganado!</h1>`;
    const modal = __modal_generator("Bienvenido a <span class ='text-info'>TRIKI</span>", modal_content, "Reiniciar");
    // Agregar MODAL a la página
    ctn_prompter.insertAdjacentHTML("beforeend", modal);
    // Agregar eventos a botones de CIERRE del MODAL (reiniciar juego)
    document.querySelectorAll("[data-bs-dismiss]").forEach((btn) => {
        btn.addEventListener("click", () => window.location.reload());
    });
    // Activar MODAL "automáticamente"
    document.body.appendChild(btn_active);
    document.querySelector("#btn-prompter").click();
    document.body.removeChild(btn_active);
}

/**
 * Mostrar MODAL indicando que nadie ganó el juego
 */
export function game_over_all() {
    const ctn_prompter = document.querySelector("#prompter");
    const config = { id: "btn-prompter", "data-bs-toggle": "modal", "data-bs-target": "#prompter-modal" };
    const btn_active = generate_element("button", "", "", config).HTML;
    const modal_content = `<h1 class="text-warning">¡El juego ha terminado! Sin ganador</h1>`;
    const modal = __modal_generator("<span class ='text-danger'>GAME OVER</span>", modal_content, "Reiniciar");
    // Agregar MODAL a la página
    ctn_prompter.insertAdjacentHTML("beforeend", modal);
    // Agregar eventos a botones de CIERRE del MODAL (reiniciar juego)
    document.querySelectorAll("[data-bs-dismiss]").forEach((btn) => {
        btn.addEventListener("click", () => window.location.reload());
    });
    // Activar MODAL "automáticamente"
    ctn_prompter.appendChild(btn_active);
    document.querySelector("#btn-prompter").click();
    ctn_prompter.removeChild(btn_active);
}
