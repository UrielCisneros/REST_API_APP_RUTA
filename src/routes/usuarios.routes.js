const { Router } = require('express');
const router = Router();
const auth = require('../middleware/auth');

const { 
    uploadFileAwsS3,
    //Usuarios
    createUsuario, 
    editUsuario,
    getUsuariosEmpresas, 
    getUsuario,
    //Clientes
    createCliente, 
    editCliente,
    uploadImagenCliente,
    //Proveedores
    createProveedores,
    editProveedores,
    deleteProveedores,
    //Zonas
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

//Proveedores
router.route('/agregar/proovedor/:idEmpresa').post(createProveedores);

router.route('/editar/proovedor/:idProveedor').put(editProveedores);

router.route('/eliminar/proovedor/:idProveedor').delete(deleteProveedores);

//Zonas
router.route('/registrar/zona/:idEmpresa').post(createZona);

router.route('/editar/zona/:idZona').put(editZona);

router.route('/eliminar/zona/:idZona').delete(deleteZona);






module.exports = router;