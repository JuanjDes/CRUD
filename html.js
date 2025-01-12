// importamos usuarios.js para usar con CommonJS
const { usuarios } = require('./usuarios.js');

function home() {
    const homepage = `
        ${encabezados("homepage")}
        <body>
            <center>
                <h1>GESTION DE USUARIOS</h1>
                <a href="/usuarios">Ver lista de usuarios</a>
                <a href="/buscar">Buscar usuario por ID</a>
                <a href="/nuevo">Crear nuevo usuario</a>
            </center>
        </body>
        </html>
    `;
    return homepage;
};

function usuariosAll() {
    const listaUsuarios = `
        ${encabezados("Lista usuarios")}
            <body>
                <center>
                    <h1>Listado de usuarios</h1>
                    <a href="/nuevo">Crear nuevo usuario</a>
                    <a href="/">Home</a>
                    <ul>
                        <table>
                            <tr>
                                <td>ID</td>
                                <td>Nombre</td>
                                <td>Edad</td>
                                <td>Procedencia</td>
                            </tr>
                            ${usuarios.map((usuario) => `
                                                        <tr>
                                                        <td>${usuario.id}</td>
                                                        <td>${usuario.nombre}</td>
                                                        <td>${usuario.edad}</td>
                                                        <td>${usuario.lugarProcedencia}</td>
                                                        <td>
                                                            <form action="/borrar/${usuario.id}" method="POST">
                                                                <button>Borrar</button>
                                                            </form>
                                                        </td>
                                                        </tr>`
                            ).join('')}
                        </table>
                    </ul>
                </center>
            </body>
            </html>
    `;
    return listaUsuarios;
};

function usuarioNew() {
    const nuevoUsuario = `
        ${encabezados("nuevo usuario")}
            <body>
                <center>
                <h1>Crear nuevo usuario</h1>
                <a href="/">Home</a><br><br><br>
                <form action="/crear" method="POST">
                    <label for="nombre">Nombre:</label><br>
                    <input type="text" id="nombre" name="nombre" required><br><br>
                    <label for="edad">Edad:</label><br>
                    <input type="number" id="edad" name="edad" required><br><br>
                    <label for="procedencia">Lugar de procedencia:</label><br>
                    <input type="text" id="procedencia" name="procedencia" required><br><br>
                    <input type="submit" value="Crear"><br><br>
                </form>
                </center>
            </body>
            </html>
    `;
    return nuevoUsuario;
};

function buscarUsuario() {
    const busquedaUsuario = `
        ${encabezados("buscar usuario")}
            <body>
                <center>
                    <h1>Buscar usuario por ID</h1>
                    <form action="/busqueda" method="POST">
                        <label for="id">ID de usuario:</label><br>
                        <input type="number" id="id" name="id" required><br><br>
                        <input type="submit" value="Buscar"><br><br>
                        <a href="/">Home</a>
                    </form>
                </center>
            </body>
            </html>
    `;
    return busquedaUsuario;
};

function encabezados(title) {
    const cabecera = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${title}</title>
            <style>
                body {background-color: black; color: white;}
                a {color: white; padding: 5px; margin: 10px; border: 1px solid; text-decoration: none}
                input[type="number"], input[type="submit"] {
                        width: 200px; padding: 5px; margin: 5px;
                    }
                td {padding: 5px;}
            </style>
        </head>
    `;
    return cabecera;
};

module.exports = { home, usuariosAll, usuarioNew, buscarUsuario };
