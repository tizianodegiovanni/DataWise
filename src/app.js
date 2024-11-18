// LLamadas de Librerias
const express = require("express");
const path = require("path");
const session =  require("express-session")
// Crear la aplicación de Express
const app = express();
app.use(express.urlencoded({ extended: true }));

const port = process.env.port || 8080;

// Configurar la carpeta pública para servir archivos estáticos
const publico = path.resolve(__dirname, "../public");
app.use(express.static(publico));

const bcrypt = require('bcrypt');

const crearCuenta = async (req, res) => {
    try {
        const { nombre, correo, contrasena, tipo_usuario_id, curso_id } = req.body;

        // Verifica que la contraseña no esté vacía
        if (!contrasena) {
            throw new Error("La contraseña es requerida.");
        }

        // Encripta la contraseña
        const hashedPassword = await bcrypt.hash(contrasena, 10); // 10 es un número estándar de rondas de sal

        // Crear la cuenta en la base de datos usando el modelo Persona
        await Persona.create({
            nombre,
            correo,
            contrasena: hashedPassword,  // Guarda la contraseña encriptada
            tipo_usuario_id,
            curso_id
        });

        res.status(201).json({ message: "Cuenta creada con éxito" });
    } catch (error) {
        console.error("Error al crear la cuenta:", error);
        res.status(500).json({ error: "Error al crear la cuenta: " + error.message });
    }
};


// Configurar el motor de vistas a usar
app.set("view engine", "ejs"); // usar EJS como motor de vistas
app.set("views", path.resolve(__dirname, "vistas")); // establecer la carpeta de vistas en ./views

// rutas para el inicio de la aplicación
app.use("/", require("./routers/router.js")); 


// Levantar servidor
app.listen(port, () => console.log("Corriendo servidor en: http://localhost:8080/"));

// Configurar la sesión
app.use(session({
    secret: 'mi_secreto',   // Cambia esto por una clave secreta
    resave: false,
    saveUninitialized: true
}));

// Configurar otros middlewares y rutas
app.use(express.json());