import { generate_element, generate_grid, generate_modal_get_size_grid } from "./generators.mjs";
import { change_pattern_boxes, validate_game } from "./logic.mjs";

document.addEventListener("DOMContentLoaded", load);

/**
 * Cargar recursos
 */
function load() {
    load_user_config();
    // Escuchador de evento propio "correct_size_grid"
    document.addEventListener("correct_size_grid", load_grid);
    document.addEventListener("grid_loaded", load_logic);
    document.querySelector("#again").addEventListener("click", () => window.location.reload());
}

/**
 * Pedir tamaño de la cuadrícula y cargar lo demás
 */
function load_user_config() {
    generate_modal_get_size_grid();
}

/**
 * Crear y cargar la cuadrícula en la página
 */
function load_grid() {
    // Tamaño de la cuadrícula
    const size = parseInt(window.size_value_grid);
    // Contenedor de cuadrícula
    const container_grid = document.querySelector("#ctn-grid");
    generate_grid(size, container_grid);
    const event_grid_load = new Event("grid_loaded");
    document.dispatchEvent(event_grid_load);
    document.querySelector("#paragraph-info").textContent = "Es el turno del jugador O";
}

/**
 * Cargar lógica del juego
 */
function load_logic() {
    get_values_grid_on_input();
}

/**
 * Obtener los valores del elemento que lanzó el evento INPUT
 */
function get_values_grid_on_input() {
    let values = [];
    window.boxes = document.querySelectorAll("[data-box-grid]");
    const inf_p = document.querySelector("#info-p");
    window.boxes.forEach((el) => {
        // Cuando se ingresa un valor se activa el evento
        el.addEventListener("input", () => {
            const value = el.value.toLowerCase();
            if (value === "x" || value === "o") {
                const row = parseInt(el.dataset.rowPosition);
                const col = parseInt(el.dataset.colPosition);
                values.push([[row, col], value]);
                el.disabled = true;
                change_pattern_boxes(value, window.boxes, inf_p);
                validate_game(values);
            }
        });
    });
}
