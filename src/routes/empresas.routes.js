const { Router } = require('express');
const router = Router();

const { getEmpresas } = require('../controllers/empresa.controllers');

router.route('/').get(getEmpresas);

module.exports = router;