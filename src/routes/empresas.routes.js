const { Router } = require('express');
const router = Router();

const { getEmpresas, createEmpresa } = require('../controllers/empresa.controllers');

router.route('/obtener').get(getEmpresas);

router.route('/registrar').post(createEmpresa);

module.exports = router;