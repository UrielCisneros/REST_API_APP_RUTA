const { Router } = require('express');
const router = Router();

const { 
    getAlmacenes,
    createAlmacen,
    getTraspasosSucursal,
    getProductosAlmacenesEmpresa, 
    createTraspaso,
    editAlmacen
} = require('../controllers/almacen.controlles');

router.route('/obtener/:idEmpresa').get(getAlmacenes);

router.route('/registrar/:idEmpresa').post(createAlmacen);

router.route('/editar/:idEmpresa').put(editAlmacen);

router.route('/obtener/traspasos/:idEmpresa').get(getTraspasosSucursal);

router.route('/registrar/traspaso/:idEmpresa').post(createTraspaso);

router.route('/obtener/productos/almacen/:idEmpresa').get(getProductosAlmacenesEmpresa);

module.exports = router;