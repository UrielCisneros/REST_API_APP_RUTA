const { Router } = require('express');
const router = Router();
const auth = require('../middleware/auth');

const { 
    getProductosEmpresa, 
    createProducto, 
    uploadFileAwsS3, 
    aggregateImageProducto, 
    deleteImagenProducto,
    updateProducto,
    deleteProducto
} = require('../controllers/productos.controllers');

router.route('/:idEmpresa').get(getProductosEmpresa);

router.route('/registrar/:idEmpresa/suc/:idSucursal').post(auth,createProducto);

router.route('/editar/:idProducto').post(auth,updateProducto);

router.route('/eliminar/:idProducto').post(auth,deleteProducto);

router.route('/agregar/:idProducto/imagen').post(auth,uploadFileAwsS3,aggregateImageProducto);

router.route('/eliminar/:idProducto/imagen/:idImagen').delete(auth,deleteImagenProducto);




module.exports = router;