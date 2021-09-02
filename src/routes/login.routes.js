const { Router } = require('express');
const router = Router();

const { loginEmpresa, LoginUsuario } = require('../controllers/login.controllers');

router.route('/empresas').post(loginEmpresa);

router.route('/usuarios').post(LoginUsuario);

module.exports = router;