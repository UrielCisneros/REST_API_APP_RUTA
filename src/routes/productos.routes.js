const { Router } = require('express');
const router = Router();

const { getProductosEmpresa, createProducto, uploadFileAwsS3, aggregateImageProducto, deleteImagenProducto  } = require('../controllers/productos.controllers');

router.route('/:idEmpresa').get(getProductosEmpresa);

router.route('/registrar/:idEmpresa/suc/:idSucursal').post(createProducto);

router.route('/agregar/:idProducto/imagen').post(uploadFileAwsS3,aggregateImageProducto);

router.route('/eliminar/:idProducto/imagen/:idImagen').delete(deleteImagenProducto);




module.exports = router;