const { Router } = require('express');
const router = Router();
const auth = require('../middleware/auth');

const { 
    uploadFileAwsS3,
    createUsuario, 
    editUsuario,
    getUsuariosEmpresas, 
    getUsuario,
    createCliente, 
    editCliente,
    uploadImagenCliente,
    createZona,
    editZona,
    deleteZona
} = require('../controllers/usuarios.controllers');

//Usuario
router.route('/obtener/:idEmpresa').get(getUsuariosEmpresas);

router.route('/registrar/:idEmpresa').post(createUsuario);

router.route('/editar/:idUsuario').put(editUsuario);

router.route('/obtener/usuario/:idUsuario').post(getUsuario);

//Cliente
router.route('/registrar/cliente/:idEmpresa').post(createCliente);

router.route('/editar/cliente/:idCliente').put(editCliente);

router.route('/agregar/:idUsuario/imagen/:imagenAgregar').put(uploadFileAwsS3,uploadImagenCliente);

//Zonas
router.route('/registrar/zona/:idEmpresa').post(createZona);

router.route('/editar/zona/:idZona').put(editZona);

router.route('/eliminar/zona/:idZona').delete(deleteZona);






module.exports = router;