const { Router } = require('express');
const router = Router();

const { loginEmpresa } = require('../controllers/login.controllers');

router.route('/empresas').post(loginEmpresa);

module.exports = router;