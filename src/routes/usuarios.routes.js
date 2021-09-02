const { Router } = require('express');
const router = Router();

const { createUsuario, getUsuariosEmpresas} = require('../controllers/usuarios.controllers');

router.route('/obtener/:idEmpresa').get(getUsuariosEmpresas);

router.route('/registrar/:idEmpresa').post(createUsuario);




module.exports = router;