const productoCtrl = {};
const ProdcutoModel = require('../models/producto');

productoCtrl.getProductos = async (req,res) => {
    try {
        const productoEmpresas = await ProdcutoModel.find().where({id_empresa: req.params.idEmpresa})
        res.status(200).json(productoEmpresas);
    } catch (error) {
        
    }
}

productoCtrl.createProducto = async (req,res) => {
    try {
        const newProducto = new ProdcutoModel({
            ...req.body,
            id_empresa: req.params.idEmpresa
        });
        await newProducto.save();
        req.status(200).json({message: "Producto agregado"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error de registro", error});
    }
}

productoCtrl.getProductosGenerales = async (req,res) => {
    try {
        console.log('Productos inventario');
        res.status(200).json({message: "Hecho"});
    } catch (error) {
        
    }
}

module.exports = productoCtrl;