
// Selección e inspección de elementos

// Usando dos métodos de selección diferentes según los criterios de aceptación
const inputNota = document.getElementById("inputNota"); // getElementById
const btnAgregar = document.querySelector(".btn-principal"); // querySelector
const listaNotas = document.getElementById("listaNotas");

// Loggeando en consola las referencias para confirmar que existen
console.log("--- Elementos Seleccionados ---");
console.log("Input:", inputNota);
console.log("Botón Agregar:", btnAgregar);
console.log("Lista UL:", listaNotas);
console.log("--------------------------------");

//  Arreglo en memoria

// Intentamos recuperar las notas existentes o inicializamos un arreglo vacío
let notas = JSON.parse(localStorage.getItem("notas")) || [];

// FUNCIONES DE CONTROL

// Función para renderizar la lista completa en el DOM
function renderizarNotas() {
    // Limpiamos el contenido actual de la lista para evitar duplicados
    listaNotas.innerHTML = "";

    // Recorremos el arreglo de notas
    notas.forEach((textoNota, index) => {
        // TASK 3: Crear elementos en el DOM
        const nuevoLi = document.createElement("li");
        
        // Modificación de contenido usando textContent para evitar inyección de código
        nuevoLi.textContent = textoNota;

        // Crear el botón de eliminar para esta nota específica
        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.className = "btn-eliminar";

        // TASK 4: Eliminar notas del DOM y del Arreglo
        btnEliminar.addEventListener("click", function() {
            // Eliminar del arreglo usando el índice
            notas.splice(index, 1);
            
            // Actualizar Local Storage
            actualizarLocalStorage();

            // Eliminar del DOM usando removeChild desde el nodo padre (ul)
            listaNotas.removeChild(nuevoLi);
            
            console.log(`Nota eliminada. Índice: ${index}`);
        });

        // Insertar el botón dentro del li, y el li dentro del ul (appendChild)
        nuevoLi.appendChild(btnEliminar);
        listaNotas.appendChild(nuevoLi);
    });
}

// Función para actualizar Local Storage (TASK 5)
function actualizarLocalStorage() {
    localStorage.setItem("notas", JSON.stringify(notas));
    console.log("Local Storage actualizado de forma exitosa.");
}

// MANEJO DE EVENTOS

// Evento para agregar nota al hacer click
btnAgregar.addEventListener("click", () => {
    const texto = inputNota.value.trim();

    // Validación de campo vacío
    if (texto === "") {
        alert("Por favor, escribe algo antes de agregar la nota.");
        return;
    }

    // Agregar la nueva nota al arreglo en memoria
    notas.push(texto);

    // Guardar los cambios actualizados en Local Storage (TASK 5)
    actualizarLocalStorage();

    // Renderizar la lista actualizada
    renderizarNotas();

    console.log(`Nota agregada con éxito: "${texto}"`);

    // Limpiar el input y devolver el foco visual
    inputNota.value = "";
    inputNota.focus();
});


// Inicialización al cargar la página

// Al cargar el script por primera vez, renderiza lo que recuperó de Local Storage
renderizarNotas();
console.log(`Página cargada. Se recuperaron ${notas.length} notas desde Local Storage.`);