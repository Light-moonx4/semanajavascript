document.addEventListener("DOMContentLoaded", () => {
    const app = document.getElementById("app");

    // --- Gestión de Usuarios (LocalStorage) ---
    const getUsuarios = () => {
        let almacenados = [];
        try {
            almacenados = JSON.parse(localStorage.getItem("users")) || [];
        } catch {
            almacenados = [];
        }
        const predefinidos = [{
            username: "neyder",
            password: "123",
            avatar: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Flow_Blender_splash_cropped.png"
        }];
        return [...predefinidos, ...almacenados];
    };

    // --- Peticiones API ---
    const getData = async () => {
        try {
            const response = await fetch("http://localhost:3000/micaela");
            return await response.json();
        } catch (error) {
            console.error("Error al obtener datos:", error);
            return [];
        }
    };

    // --- Navegador / Router ---
    const navigate = (ruta) => {
        app.innerHTML = "";

        if (ruta === "login") {
            app.innerHTML = `
                <div class="auth-container">
                    <div class="panel-arcade">
                        <form id="loginForm">
                            <label>Username</label>
                            <input type="text" id="usernameIn" required>
                            <label>Password</label>
                            <input type="password" id="passwordIn" required>
                            <button type="submit" class="btn-primary">LOGIN</button>
                        </form>
                        <button id="registroir" class="btn-secondary">REGISTRARSE</button>
                    </div>
                </div>
            `;
            document.getElementById("loginForm").onsubmit = (e) => {
                e.preventDefault();
                const user = getUsuarios().find(u => 
                    u.username === document.getElementById("usernameIn").value && 
                    u.password === document.getElementById("passwordIn").value
                );
                if (user) {
                    localStorage.setItem("user", JSON.stringify(user));
                    navigate("dashboard");
                } else {
                    alert("ACCESO DENEGADO: Credenciales Incorrectas");
                }
            };
            document.getElementById("registroir").onclick = () => navigate("register");
        } 
        
        else if (ruta === "register") {
            app.innerHTML = `
                <div class="auth-container">
                    <div class="panel-arcade">
                        <form id="registerForm">
                            <label>Nuevo Username</label>
                            <input type="text" id="nuevoUsername" required>
                            <label>Password</label>
                            <input type="password" id="nuevaPassword" required>
                            <label>Avatar URL</label>
                            <input type="url" id="fotoUrl" placeholder="http://...">
                            <button type="submit" class="btn-primary">CREAR CUENTA</button>
                        </form>
                        <button id="volver" class="btn-secondary">VOLVER</button>
                    </div>
                </div>
            `;
            document.getElementById("registerForm").onsubmit = (e) => {
                e.preventDefault();
                const users = JSON.parse(localStorage.getItem("users")) || [];
                users.push({
                    username: document.getElementById("nuevoUsername").value,
                    password: document.getElementById("nuevaPassword").value,
                    avatar: document.getElementById("fotoUrl").value || "https://via.placeholder.com/150"
                });
                localStorage.setItem("users", JSON.stringify(users));
                alert("Usuario registrado con éxito");
                navigate("login");
            };
            document.getElementById("volver").onclick = () => navigate("login");
        } 

        else if (ruta === "dashboard") {
            const user = JSON.parse(localStorage.getItem("user"));
            if (!user) return navigate("login");

            // Diseño de Dashboard Completo
            app.innerHTML = `
                <div class="dashboard-layout">
                    <header class="dashboard-header panel-arcade">
                        <div class="user-info">
                            <img src="${user.avatar}" class="user-avatar">
                            <h1>BIENVENIDO, ${user.username.toUpperCase()}</h1>
                        </div>
                        <button id="cerrar" class="btn-danger">LOGOUT</button>
                    </header>

                    <section class="dashboard-content">
                        <aside class="panel-arcade form-container">
                            <h3>NUEVO REGISTRO</h3>
                            <form id="createForm">
                                <input type="text" id="name" placeholder="Nombre" required>
                                <input type="text" id="lastname" placeholder="Apellido" required>
                                <input type="url" id="imgUrl" placeholder="Imagen URL" required>
                                <textarea id="desc" placeholder="Descripción..."></textarea>
                                <button type="submit" class="btn-primary">GUARDAR</button>
                            </form>
                        </aside>

                        <main id="data-grid" class="cards-grid"></main>
                    </section>
                </div>
            `;

            document.getElementById("cerrar").onclick = () => {
                if (confirm("¿Cerrar sesión de la terminal?")) {
                    localStorage.removeItem("user");
                    navigate("login");
                }
            };

            // Lógica para Crear
            document.getElementById("createForm").onsubmit = async (e) => {
                e.preventDefault();
                const payload = {
                    name: document.getElementById("name").value,
                    lastname: document.getElementById("lastname").value,
                    url: document.getElementById("imgUrl").value,
                    description: document.getElementById("desc").value
                };

                await fetch("http://localhost:3000/micaela", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload)
                });
                
                document.getElementById("createForm").reset();
                renderCards(); // Refrescar lista
            };

            renderCards();
        }
    };

    // --- Renderizar Tarjetas ---
    const renderCards = async () => {
        const grid = document.getElementById("data-grid");
        if (!grid) return;

        const data = await getData();
        grid.innerHTML = "";

        data.forEach(item => {
            const card = document.createElement("div");
            card.className = "card-arcade panel-arcade";
            card.innerHTML = `
                <div class="card-img" style="background-image: url('${item.url}')"></div>
                <div class="card-body">
                    <h4>${item.name} ${item.lastname}</h4>
                    <p>${item.description}</p>
                    <div class="card-footer">
                        <button class="btn-edit" onclick="window.editItem('${item.id}', '${item.name}')">EDIT</button>
                        <button class="btn-delete" onclick="window.deleteItem('${item.id}')">DEL</button>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });
    };

    // Funciones globales para botones dinámicos
    window.deleteItem = async (id) => {
        if (confirm("¿Eliminar registro permanentemente?")) {
            await fetch(`http://localhost:3000/micaela/${id}`, { method: "DELETE" });
            renderCards();
        }
    };

    window.editItem = async (id, currentName) => {
        const newName = prompt("Nuevo nombre:", currentName);
        if (newName) {
            await fetch(`http://localhost:3000/micaela/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: newName })
            });
            renderCards();
        }
    };

    // Inicio
    const userLogged = localStorage.getItem("user");
    navigate(userLogged ? "dashboard" : "login");
});