document.addEventListener("DOMContentLoaded", () => {
  let boton = document.getElementById("sumarBtn");
  let boton_restar = document.getElementById("restarBtn");

  boton.addEventListener("click", function () {
    // Parsear el contenido de las entradas de números (por defecto contienen 'Strings'), se parsean a 'Float'
    let num1 = parseFloat(document.getElementById("num1").value) || 0;
    let num2 = parseFloat(document.getElementById("num2").value) || 0;

    let suma = num1 + num2;
    let resultCTN = document.getElementById("resultado-suma");

    if (suma >= 0) {
      resultCTN.textContent = "Suma positiva: " + suma;
    } else {
      resultCTN.textContent = "Suma negativa: " + suma;
    }
  });

  boton_restar.addEventListener("click", function () {
    // Parsear el contenido de las entradas de números (por defecto contienen 'Strings'), se parsean a 'Float'
    let num3 = parseFloat(document.getElementById("num3").value) || 0;
    let num4 = parseFloat(document.getElementById("num4").value) || 0;

    let resta = num3 - num4;
    document.getElementById("resultado-resta").textContent = resta;
  });
});
