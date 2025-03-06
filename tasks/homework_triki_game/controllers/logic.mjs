import { game_over_all, winner_modal } from "./generators.mjs";

/**
 * Validar los valores actuales del juego
 * @param {[int]} values
 */
export function validate_game(values) {
    separate_values_by_player(values);
}

/**
 * Separar cacillas por jugador según el valor almacenado (`x` || `o`)
 * @param {{matriz_game: [[row: int, col: int], "player"]}} values Valores actuales del juego
 */
function separate_values_by_player(values) {
    let player_x = [];
    let player_o = [];
    for (let row = 0; row < values.length; row++) {
        const player_actual = values[row][1].toLowerCase(); // Jugador de la cacilla actual
        if (player_actual === "x") {
            // Agregar las posiciones de la casilla actual al jugador "x"
            player_x.push([values[row][0], values[row][1]]);
            // Validar y verificar si el jugador gana con las posiciones actuales
            // Solo se verifica si el jugador tiene al menos 3 casillas
            if (player_x.length >= 3) verify_winner(player_x);
        } else if (player_actual === "o") {
            // Agregar las posiciones de la casilla actual al jugador "o"
            player_o.push([values[row][0], values[row][1]]);
            if (player_o.length >= 3) verify_winner(player_o);
        }
    }
}

function verify_winner(player_values) {
    let winner_case_matriz;
    switch (parseInt(window.size_value_grid)) {
        case 3:
            winner_case_matriz = winner_case()[3];
            break;
        case 5:
            winner_case_matriz = winner_case()[5];
            break;
        case 7:
            winner_case_matriz = winner_case()[7];
            break;
        default:
            throw new Error("Tamaño no admitido, 'separate_values_by_player'");
    }

    let player_positions = player_values.map((item) => item[0]);

    // Verificamos si alguna matriz de condiciones ganadoras está completamente en las jugadas del jugador
    const winner = winner_case_matriz.some((win_case) => win_case.every((pos) => player_positions.some((p) => p[0] === pos[0] && p[1] === pos[1])));
    // Ganador jugador
    if (winner === true) {
        winner_modal(player_values[0][1]);
    } else {
        // Se valida si hay un "game over" (ningún jugador ganó)
        validate_game_over();
    }
}

/**
 * Cambiar turno del jugador
 * @param {String} value Valor recién ingresado (el valor que justo se ingresó)
 * @param {HTMLCollection} boxes Casillas HTML de la cuadrícula
 * @param {HTMLElement} info_p Párrafo contenedor de información
 */
export function change_pattern_boxes(value, boxes, info_p) {
    if (value === "x") {
        // Permitir solo entrada del jugador O
        boxes.forEach((element) => {
            element.setAttribute("oninput", "this.value = this.value.replace(/[^oO]/g, '')");
        });
        info_p.innerHTML = `<span class='text-info f-bold'>Es el turno del jugador O</span>`;
    } else if (value === "o") {
        // Permitir solo entrada del jugador X
        boxes.forEach((element) => {
            element.setAttribute("oninput", "this.value = this.value.replace(/[^xX]/g, '')");
        });
        info_p.innerHTML = `<span class='text-info f-bold'>Es el turno del jugador X</span>`;
    }
}

function validate_game_over() {
    let count = 0;
    window.boxes.forEach((box) => {
        if (box.disabled === true) count++;
    });
    if (count === window.boxes.length) {
        game_over_all();
    }
}

/**
 * Verficar y validar juego
 * @param {{matriz_game: [[row, col], player]}} values Valores actuales del juego
 */
function winner_case() {
    // prettier-ignore
    const matriz_winner_three = [
        // Caso 1 - Fila superior
        [ [0, 0], [0, 1], [0, 2] ],
        // Caso 2 - Diagonal principal
        [ [0, 0], [1, 1], [2, 2] ],
        // Caso 3 - Diagonal secundaria
        [ [0, 2], [1, 1], [2, 0] ],
        // Caso 4 - Fila central
        [ [1, 0], [1, 1], [1, 2] ],
        // Caso 5 - Fila inferior
        [ [2, 0], [2, 1], [2, 2] ],
        // Caso 6 - Columna central
        [ [0, 1], [1, 1], [2, 1] ],
        // Caso 7 - Columna derecha
        [ [0, 2], [1, 2], [2, 2] ],
        // Caso 8 - Columna izquierda
        [ [0, 0], [1, 0], [2, 0] ]
    ];

    // prettier-ignore
    const matriz_winner_five = [
    // Filas
    [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4]],
    [[1, 0], [1, 1], [1, 2], [1, 3], [1, 4]],
    [[2, 0], [2, 1], [2, 2], [2, 3], [2, 4]],
    [[3, 0], [3, 1], [3, 2], [3, 3], [3, 4]],
    [[4, 0], [4, 1], [4, 2], [4, 3], [4, 4]],
    
    // Columnas
    [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]],
    [[0, 1], [1, 1], [2, 1], [3, 1], [4, 1]],
    [[0, 2], [1, 2], [2, 2], [3, 2], [4, 2]],
    [[0, 3], [1, 3], [2, 3], [3, 3], [4, 3]],
    [[0, 4], [1, 4], [2, 4], [3, 4], [4, 4]],

    // Diagonales
    [[0, 0], [1, 1], [2, 2], [3, 3], [4, 4]], // Diagonal principal
    [[0, 4], [1, 3], [2, 2], [3, 1], [4, 0]]  // Diagonal secundaria
];

    // prettier-ignore
    const matriz_winner_seven = [
    // Filas
    [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6]],
    [[1, 0], [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6]],
    [[2, 0], [2, 1], [2, 2], [2, 3], [2, 4], [2, 5], [2, 6]],
    [[3, 0], [3, 1], [3, 2], [3, 3], [3, 4], [3, 5], [3, 6]],
    [[4, 0], [4, 1], [4, 2], [4, 3], [4, 4], [4, 5], [4, 6]],
    [[5, 0], [5, 1], [5, 2], [5, 3], [5, 4], [5, 5], [5, 6]],
    [[6, 0], [6, 1], [6, 2], [6, 3], [6, 4], [6, 5], [6, 6]],

    // Columnas
    [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0]],
    [[0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1]],
    [[0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2]],
    [[0, 3], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3]],
    [[0, 4], [1, 4], [2, 4], [3, 4], [4, 4], [5, 4], [6, 4]],
    [[0, 5], [1, 5], [2, 5], [3, 5], [4, 5], [5, 5], [6, 5]],
    [[0, 6], [1, 6], [2, 6], [3, 6], [4, 6], [5, 6], [6, 6]],

    // Diagonales
    [[0, 0], [1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6]], // Diagonal principal
    [[0, 6], [1, 5], [2, 4], [3, 3], [4, 2], [5, 1], [6, 0]]  // Diagonal secundaria
];

    return { 3: matriz_winner_three, 5: matriz_winner_five, 7: matriz_winner_seven };
}
