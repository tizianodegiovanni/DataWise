const { match } = require("assert");
const bcrypt = require('bcrypt');
const base_de_datos = require("../base de datos/modelos")

const mainController = require("../controllers/controller.js");

// Retorna la vista del editado de perfil 
mainController.cargar_notas = async (req, res) => {
    return res.render("cargar_notas.ejs");
};
// Método para procesar carga de notas
mainController.procesar_carga_notas = async (req, res) => {
    const { student_name, subject, reportNumber, grade } = req.body;

    try {
        // Crear un nuevo registro en la base de datos
        await base_de_datos.Nota.create({
            nombre_alumno: student_name,
            materia: subject,
            numero_informe: reportNumber,
            nota: grade,
        });

        // Redirigir tras cargar la nota
        res.redirect('/cargar-notas');
    } catch (error) {
        console.error("Error al cargar la nota:", error);
        res.status(500).send("Error en la carga de la nota");
    }
};
mainController.contenido_del_boletin = async (req, res) => {
    return res.render("contenido_del_boletin.ejs");
};

// Método para mostrar la página de contenido del boletín
mainController.mostrarBoletin = async (req, res) => {
    return res.render("contenido_del_boletin.ejs");
}; 

mainController.crear_cuenta = async (req, res) => {
    return res.render("crear_cuenta.ejs");
};
// Procesar la creación de cuenta
mainController.creaar_cuenta = async (req, res) => {
    const { nombre, correo, contrasena } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(contrasena, 10);

        await db.Persona.create({
            nombre,
            correo,
            contrasena: hashedPassword,
            tipo_usuario_id: 2,  // Este valor se ajusta según los permisos
            curso_id: null  // Asigna el valor necesario para el curso
        });

        res.redirect('/login');
    } catch (error) {
        console.error("Error al crear la cuenta:", error);
        res.status(500).send("Error en la creación de la cuenta");
    }
};

mainController.info_escuela = async (req, res) => {
    return res.render("info_escuela.ejs");
};
mainController.log_in = async (req, res) => {

const { correo, contrasena } = req.body;

    try {
        // Buscar la persona por correo en la base de datos
        const usuario = await base_de_datos.Persona.findOne({ where: { correo: correo } });

        // Verificar si el usuario existe
        if (!usuario) {
            return res.status(400).send("Correo o contraseña incorrectos");
        }

        // Verificar si la contraseña es correcta
        const esCorrecta = await bcrypt.compare(contrasena, usuario.contrasena);
        
        if (!esCorrecta) {
            return res.status(400).send("Correo o contraseña incorrectos");
        }

        // Iniciar sesión, por ejemplo, guardando los datos del usuario en la sesión
        req.session.usuario = usuario;  // Asegúrate de tener configurado el middleware de sesión
        res.redirect("/dashboard"); // Redirigir a la página principal tras iniciar sesión

    } catch (error) {
        console.error("Error en el login:", error);
        res.status(500).send("Error en el inicio de sesión");
    }
    return res.render("log_in.ejs");
};
mainController.solicitar_cuenta = async (req, res) => {
    return res.render("solicitar_cuenta.ejs");
};
module.exports = mainController;