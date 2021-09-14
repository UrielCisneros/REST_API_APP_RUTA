const { Router } = require('express');
const router = Router();
const auth = require('../middleware/auth');

const { getEmpresa, createEmpresa, editEmpresa } = require('../controllers/empresa.controllers');

router.route('/obtener/:idEmpresa').get(auth,getEmpresa);

router.route('/registrar').post(auth,createEmpresa);

router.route('/editar/:idEmpresa').put(auth,editEmpresa);

module.exports = router;