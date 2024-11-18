const express = require('express');
const router = express.Router();
const mainController = require('../controllers/controller');


// Definir las rutas
router.get('/', mainController.cargar_notas); 
router.get('/contenido_del_boletin', mainController.contenido_del_boletin); 
router.get('/crear', mainController.creaar_cuenta); 
router.get('/info', mainController.info_escuela); 
router.get('/login', mainController.log_in); 
router.get('/solicitar', mainController.solicitar_cuenta); 

// Rutas para procesar los formularios
router.post('/log_in', mainController.log_in); 
router.post('/crear', mainController.creaar_cuenta);
router.post('/', mainController.procesar_carga_notas);

module.exports = router;
