const { Router } = require('express');
const router = Router();
const auth = require('../middleware/auth');

const { 
    createUsuario, 
    getUsuariosEmpresas, 
    getUsuario,
    createCliente, 
    editCliente,
    createZona,
    editZona,
    deleteZona
} = require('../controllers/usuarios.controllers');

//Usuario
router.route('/obtener/:idEmpresa').get(getUsuariosEmpresas);

router.route('/registrar/:idEmpresa').post(createUsuario);

router.route('/obtener/usuario/:idUsuario').post(getUsuario);

//Cliente
router.route('/registrar/cliente/:idEmpresa').post(createCliente);

router.route('/editar/cliente/:idEmpresa').put(editCliente);

//Zonas
router.route('/registrar/zona/:idEmpresa').post(createZona);

router.route('/editar/zona/:idZona').put(editZona);

router.route('/eliminar/zona/:idZona').delete(deleteZona);






module.exports = router;