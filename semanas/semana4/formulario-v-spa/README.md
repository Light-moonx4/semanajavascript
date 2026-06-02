# Sistema de Autenticación SPA Vanilla JavaScript

Este proyecto es una aplicación de página única (**SPA** - *Single Page Application*) minimalista y estructurada en JavaScript puro (Vanilla JS). Implementa un flujo completo de autenticación que incluye inicio de sesión, registro de nuevos usuarios y un panel de control (dashboard) privado con persistencia de datos local.

El desarrollo está estructurado de forma completamente modular dentro de un único archivo de lógica que gestiona dinámicamente el DOM, prescindiendo de librerías o frameworks externos.

---

## 🚀 Características Clave

*   **Enrutamiento Dinámico (Client-Side Routing):** Navegación fluida entre pantallas (`login`, `register`, `dashboard`) mediante la manipulación directa del contenedor principal (`#app`) sin recargar el navegador.
*   **Persistencia de Datos Local:** Uso estratégico de `localStorage` para almacenar la colección de usuarios registrados y mantener el estado de la sesión activa del usuario.
*   **Usuarios Predefinidos:** Cuenta con una credencial precargada por defecto en el código para pruebas inmediatas de acceso.
*   **Gestión Segura del DOM:** Toda la lógica de inicialización y renderizado se encuentra encapsulada dentro del evento `DOMContentLoaded`, garantizando la correcta manipulación de los nodos del DOM.
*   **Modularidad Avanzada:** Implementación del operador *Spread* (`...`) para la unificación y fusión eficiente de arreglos de datos (usuarios predefinidos + usuarios de la base de datos local).

---

## 🛠️ Flujo de Arquitectura y Enrutamiento

La aplicación se rige bajo una función centralizada de renderizado llamada `navigate(ruta)`. Esta evalúa la ruta solicitada y reescribe dinámicamente el `innerHTML` del contenedor base.

```
                  +-------------------------+
                  |  Carga Inicial de App   |
                  +------------+------------+
                               |
                ¿Existe sesión en localStorage?
                               |
                      +--------+--------+
                   SÍ |                 | NO
                      v                 v
               [ dashboard ]       [ login ]
                                        |
                             (Click en Registrarse)
                                        |
                                        v
                                  [ register ]
```

1.  **Pantalla de Login (`login`):** Formulario de acceso que valida las credenciales ingresadas contra la base de datos local. Al tener éxito, guarda el estado de sesión en `localStorage` y redirige al panel.
2.  **Pantalla de Registro (`register`):** Formulario parametrizado para la creación de nuevas cuentas, permitiendo definir un nombre de usuario, contraseña y la URL de una foto de perfil personalizada (avatar).
3.  **Panel de Control (`dashboard`):** Vista protegida. Si se intenta acceder sin una sesión válida, la aplicación redirige automáticamente al Login. Muestra los datos específicos del usuario en sesión y permite destruirla de forma segura.

---

## 📂 Análisis del Código Principal

### 1. Inicialización y Seguridad del DOM
Para mitigar errores de renderizado en blanco, el script espera explícitamente a que el árbol del documento esté completamente estructurado:
```javascript
document.addEventListener("DOMContentLoaded", () => {
    const app = document.getElementById("app");
    // Lógica encapsulada...
});
```

### 2. Gestión de Usuarios y Fusión de Datos
La función `getUsuarios` recupera los registros del `localStorage`. En caso de estar vacío, inicializa un arreglo por defecto y utiliza la sintaxis *Spread* para retornar una única lista unificada:
```javascript
const getUsuarios = () => {
    const almacenados = JSON.parse(localStorage.getItem("users")) || [];
    const predefinidos = [
        { username: "neyder", password: "123", avatar: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Flow_Blender_splash_cropped.png" }
    ];
    return [...predefinidos, ...almacenados]; // Combinación eficiente de arrays
};
```

### 3. Credenciales de Prueba por Defecto
Para validar el funcionamiento del sistema inmediatamente sin necesidad de registrarse primero, se puede emplear la siguiente cuenta del sistema:
*   **Username:** `neyder`
*   **Password:** `123`

---

## 💻 Tecnologías Utilizadas

*   **HTML5:** Estructura semántica base y formularios nativos con validaciones integradas (`required`, `type="url"`).
*   **JavaScript (ES6+):** Programación funcional, manipulación dinámica del DOM, manejo de eventos y almacenamiento local.
*   **Local Storage API:** Mecanismo de almacenamiento del lado del cliente para persistencia de sesiones y datos.
