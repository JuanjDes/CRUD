// FALTA LA OPCIÓN DE MODIFICAR USUARIO

const express = require('express');
const app = express();

const {home, usuariosAll, usuarioNew, buscarUsuario} = require('./html.js');
const { usuarios } = require('./usuarios.js');

// Middleware para parsear los datos del body
app.use(express.json());

/* Middleware para usar CORS (Cross-Origin Resource Sharing) -> Intercambio de recursos entre orígenes.
    para que al modificar o añadir datos desde formulario sean legibles en el CRUD*/
app.use(express.urlencoded({ extended: true }));

const PORT = 3000;



/***********************************************************************************************************/




// Ruta '/' con enlaces a: lista de usuarios, nuevo usuario, ver usuario por nombre
app.get('/', (req, res) => {
    res.send(home());
});


// CRUD: READ muestra todos los usuarios
app.get('/usuarios', (req, res) => {
    res.send(usuariosAll());

});


// CRUD: CREATE pide datos de nuevo usuario
app.get('/nuevo', (req, res) => {
    res.send(usuarioNew());
});

// CRUD: CREATE crea nuevo usuario
app.post('/crear', (req, res) => {
    const nuevoUsuario = {
        id: usuarios.length + 1,
        nombre: req.body.nombre,
        edad: parseInt(req.body.edad),
        lugarProcedencia: req.body.procedencia
    };

    usuarios.push(nuevoUsuario);
    res.redirect('/usuarios');
});



// CRUD: READ busca un solo usuario
app.get('/buscar', (req, res) => {
    res.send(buscarUsuario());
});

// CRUD: READ muestra un usuario
app.post('/busqueda', (req, res) => {
    const id = parseInt(req.body.id, 10);
    const usuario = usuarios.find((user) => user.id === id);

    if (!usuario) {
        return res.status(404).send(`No se encontró el usuario 
                                        <br>
                                        <a href="/">Home</a> `);
    }

    res.send(`
        <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Buscar usuario</title>
                <style>
                    body {background-color: black; color: white;}
                </style>
            </head>
            <body>
                <center>
                    <h1>Usuario: ${usuario.nombre}</h1>
                    <p>ID: ${usuario.id}</p>
                    <p>Edad: ${usuario.edad}</p>
                    <p>Lugar de procedencia: ${usuario.lugarProcedencia}</p>
                    <br><br>
                    <a href="/">Home</a>          
                </center>
            </body>
            </html>
    `);
});


// CRUD: Borrar usuario
app.post('/borrar/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const index = usuarios.findIndex((user) => user.id === id);

    if (index === -1) {
        return res.status(404).send(`No se encontró el usuario 
                                        <br>
                                        <a href="/">Home</a> `);
    }

    usuarios.splice(index, 1);  // el 1 hace que se elimine sólo un elemento
    res.redirect('/usuarios');
});





// Controlar error 400
app.use ((req, res) => {
    res.status(404).send('Error 404: Página no encontrada');
})


app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
