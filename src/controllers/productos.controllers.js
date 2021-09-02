const productoCtrl = {};
const ProdcutoModel = require('../models/producto');
const moment = require("moment");

productoCtrl.getProductosEmpresa = async (req,res) => {
    try {
        const productoEmpresas = await ProdcutoModel.find().where({id_empresa: req.params.idEmpresa})
        res.status(200).json(productoEmpresas);
    } catch (error) {
        
    }
}

productoCtrl.createProducto = async (req,res) => {
    try {
        const {
            datos_generales,
            precios,
            precios_plazos,
            contado,
            id_empresa,
            id_sucursal
        } = req.body;
        //TODO: Condicionar los datos obligatorios
        if(
			!precios.unidad_de_compra.unidad ||
			!precios.unidad_de_compra.cantidad ||
			!precios.unidad_de_compra.precio_unitario_sin_impuesto ||
			!precios.unidad_de_compra.precio_unitario_con_impuesto
		) throw new Error("Datos incompletos.");
        //Generar fecha
        const hoy = moment();
        //Armar array de producto
        const newProducto = new ProdcutoModel(
            {
                datos_generales,
                precios,
                precios_plazos,
                contado,
                id_empresa,
                id_sucursal,
                fecha_creacion: hoy,
                numero_mes_creacion: hoy.week(),
            }
        );
        //guardar producto
        await newProducto.save();
        req.status(200).json({message: "Producto agregado"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error de registro", error});
    }
}

productoCtrl.updateProducto = async (req,res) => {
    try{

    }catch(error){
        console.log(error);
        res.status(500).json({message: "Error de registro", error});
    }
}

productoCtrl.getProductosGenerales = async (req,res) => {
    try {
        console.log('Productos inventario');
        res.status(200).json({message: "Hecho"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error de registro", error});
    }
}

module.exports = productoCtrl;