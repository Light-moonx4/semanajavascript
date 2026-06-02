# Gestión de Datos con Objetos, Sets y Maps en JavaScript

## Descripción

Este proyecto tiene como objetivo reforzar el uso de estructuras de datos avanzadas en JavaScript mediante la implementación de:

- Objetos para almacenar información de productos.
- Sets para manejar datos únicos y eliminar duplicados.
- Maps para relacionar categorías con productos.
- Métodos de iteración como `for...in`, `for...of`, `forEach()`, `Object.keys()`, `Object.values()` y `Object.entries()`.
- Validaciones básicas para garantizar la integridad de los datos.

---

## Estructura del Proyecto

```text
📁 proyecto
│
├── gestion_datos.js
└── README.md


## Esplicacion del codigo

{
  id: 1,
  nombre: "Laptop",
  precio: 2500,
  categoria: "Tecnología"
}
2. Validación de Productos

Se implementó una función llamada validarProducto() para verificar que cada producto tenga:

Un id válido de tipo número.
Un nombre de tipo texto.
Un precio numérico mayor que cero.

Ejemplo:

function validarProducto(producto) {
  return (
    producto.id !== undefined &&
    typeof producto.id === "number" &&
    producto.nombre &&
    typeof producto.nombre === "string" &&
    producto.precio > 0
  );
}

Esta validación ayuda a evitar datos incompletos o incorrectos.

3. Uso de Set

Se creó un Set con números repetidos para demostrar cómo JavaScript elimina automáticamente los duplicados.

Ejemplo:

const numeros = new Set([10, 20, 30, 20, 40, 10, 50]);
Operaciones realizadas

Agregar un elemento:

numeros.add(60);

Verificar existencia:

numeros.has(30);

Eliminar un elemento:

numeros.delete(20);

Recorrer el Set:

for (const numero of numeros) {
  console.log(numero);
}
4. Uso de Map

Se creó un Map para relacionar categorías con nombres de productos.

Ejemplo:

const categoriasProductos = new Map();

Llenado del Map:

productos.forEach((producto) => {
  categoriasProductos.set(producto.categoria, producto.nombre);
});

El Map permite almacenar pares clave-valor de manera eficiente.

5. Iteración de Estructuras de Datos
Recorrido de objetos con for...in
for (const propiedad in producto) {
  console.log(`${propiedad}: ${producto[propiedad]}`);
}

Permite acceder a cada propiedad del objeto.

Uso de Object.keys()
Object.keys(producto);

Devuelve un arreglo con las claves del objeto.

Uso de Object.values()
Object.values(producto);

Devuelve un arreglo con los valores del objeto.

Uso de Object.entries()
Object.entries(producto);

Devuelve un arreglo de pares [clave, valor].

Recorrido del Set con for...of
for (const numero of numeros) {
  console.log(numero);
}

Permite recorrer cada elemento del Set.

Recorrido del Map con forEach()
categoriasProductos.forEach((producto, categoria) => {
  console.log(`${categoria}: ${producto}`);
});

Permite acceder tanto a la clave como al valor almacenado.

Salida Esperada

Al ejecutar el archivo se mostrará en consola:

Validación de Productos
Producto válido: Laptop
Producto válido: Mouse
Producto válido: Teclado
Set sin duplicados
Set(5) { 10, 20, 30, 40, 50 }
Verificación de existencia
¿Existe el número 30? true
Categorías y Productos
Tecnología: Laptop
Accesorios: Teclado
Conceptos Aplicados
Objetos
Arrays
Set
Map
Funciones
Validaciones
for...in
for...of
forEach()
Object.keys()
Object.values()
Object.entries()
let y const