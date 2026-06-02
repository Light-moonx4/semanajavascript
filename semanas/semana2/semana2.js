// Creación del objeto de productos

const productos = [
  {
    id: 1,
    nombre: "Laptop",
    precio: 2500,
    categoria: "Tecnología"
  },
  {
    id: 2,
    nombre: "Mouse",
    precio: 80,
    categoria: "Accesorios"
  },
  {
    id: 3,
    nombre: "Teclado",
    precio: 150,
    categoria: "Accesorios"
  }
];

// Validación de productos

function validarProducto(producto) {
  return (
    producto.id !== undefined &&
    typeof producto.id === "number" &&
    producto.nombre &&
    typeof producto.nombre === "string" &&
    producto.precio !== undefined &&
    typeof producto.precio === "number" &&
    producto.precio > 0
  );
}

console.log("=== VALIDACIÓN DE PRODUCTOS ===");

productos.forEach((producto) => {
  if (validarProducto(producto)) {
    console.log(`Producto válido: ${producto.nombre}`);
  } else {
    console.log("Producto inválido:", producto);
  }
});

// TASK 2 - Uso de Set

console.log("\n=== USO DE SET ===");

// Set con números repetidos
const numeros = new Set([10, 20, 30, 20, 40, 10, 50]);

console.log("Set inicial (sin duplicados):");
console.log(numeros);

// Agregar un nuevo número
numeros.add(60);

console.log("Después de agregar 60:");
console.log(numeros);

// Verificar existencia de un número
console.log("¿Existe el número 30?", numeros.has(30));

// Eliminar un número
numeros.delete(20);

console.log("Después de eliminar 20:");
console.log(numeros);

// Recorrer Set con for...of
console.log("Recorrido del Set:");
for (const numero of numeros) {
  console.log(numero);
}


// TASK 3 - Creación de un Map

console.log("\n=== MAP DE CATEGORÍAS ===");

const categoriasProductos = new Map();

productos.forEach((producto) => {
  categoriasProductos.set(producto.categoria, producto.nombre);
});

console.log(categoriasProductos);


// 4 - Iteración sobre estructuras de datos

console.log("\n=== RECORRIDO DE OBJETOS ===");

// for...in para listar propiedades de cada producto
productos.forEach((producto) => {
  console.log(`\nProducto ID: ${producto.id}`);

  for (const propiedad in producto) {
    console.log(`${propiedad}: ${producto[propiedad]}`);
  }
});

// Métodos de objetos
console.log("\n=== Object.keys() ===");
productos.forEach((producto) => {
  console.log(Object.keys(producto));
});

console.log("\n=== Object.values() ===");
productos.forEach((producto) => {
  console.log(Object.values(producto));
});

console.log("\n=== Object.entries() ===");
productos.forEach((producto) => {
  console.log(Object.entries(producto));
});

// for...of para recorrer Set
console.log("\n=== RECORRIDO DEL SET CON for...of ===");

for (const numero of numeros) {
  console.log(`Número: ${numero}`);
}

// forEach para recorrer Map
console.log("\n=== RECORRIDO DEL MAP CON forEach ===");

categoriasProductos.forEach((nombreProducto, categoria) => {
  console.log(
    `Categoría: ${categoria} -> Producto: ${nombreProducto}`
  );
});

// 5 - Pruebas finales

console.log("\n=== LISTA COMPLETA DE PRODUCTOS ===");
console.log(productos);

console.log("\n=== LISTA DE NÚMEROS ÚNICOS (SET) ===");
console.log([...numeros]);

console.log("\n=== CATEGORÍAS Y PRODUCTOS (MAP) ===");
categoriasProductos.forEach((producto, categoria) => {
  console.log(`${categoria}: ${producto}`);
});