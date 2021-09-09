const productoCtrl = {};
const ProductoModel = require('../models/producto');
const moment = require("moment");
const uploadFile = require("../middleware/uploadFile");
const AlmacenProductoModel = require("../models/productos_almacenes");
const SucursalModel = require('../models/sucursal');

productoCtrl.uploadFileAwsS3 = (req, res, next) => {
	uploadFile.upload(req, res, function (err) {
		if (err) {
			res.status(404).json({ message: "Formato de imagen no valido", err });
		}else{
            return next();
        }	
	});
};

productoCtrl.getProductosEmpresa = async (req,res) => {
    try {
        const filtro = req.params.filtro;
        let filtroMatch = {};
        const sucursalEmpresa = await SucursalModel.findOne().where({id_empresa: req.params.idEmpresa, sucursal_principal: true });
        if(filtro){
            filtro_match = 
			{
				$match: {
					$or: [
						{ 'datos_generales.codigo_barras': { $regex: '.*' + filtro + '.*', $options: 'i' } },
						{ 'datos_generales.descripcion': { $regex: '.*' + filtro + '.*', $options: 'i' } }
					],
					$and: [ 
						{id_empresa: req.params.idEmpresa},
						{id_sucursal: sucursalEmpresa._id},
						{eliminado: false}
					],
					
				}
			};
        }else{
            filtro_match = 
			{
				$match: {
					id_empresa: req.params.idEmpresa,
					id_sucursal: sucursalEmpresa._id,
                    eliminado: false
				}
			};
        }
        const productosEmpresas = await ProductoModel.aggregate(
            [

            ]
        );

        // const productoEmpresas = await ProductoModel.find().where({id_empresa: req.params.idEmpresa})   
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
        } = req.body;
        console.log("llego");
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
        const newProducto = new ProductoModel(
            {
                datos_generales,
                precios,
                precios_plazos,
                id_empresa: req.params.idEmpresa,
                id_sucursal: req.params.idSucursal,
                fecha_creacion: hoy,
                year_de_creacion:hoy.year(),
                numero_mes_creacion: hoy.week(),
                eliminado: false
            }
        );
        //guardar producto
        await newProducto.save();
        res.status(200).json({message: "Producto agregado"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error de registro", error});
    }
}

productoCtrl.aggregateImageProducto = async (req,res) => {
    try {
        if(req.file){
            await ProductoModel.updateOne(
                {
                    _id: req.params.idProducto
                },
                {
                    $addToSet: {
                        imagenes: [
                            {
                                key_imagen: req.file.key,
				                location_imagen: req.file.location
                            }
                        ]
                    }
                },
            );
            res.status(200).json({message: "Imagen agregada"});
        }else{
            res.status(500).json({message: "Error de registro."});
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error de registro", error});
    }
}

productoCtrl.deleteImagenProducto = async (req,res) => {
    try {
        const productoBase = await ProductoModel.findById(req.params.idProducto);
        const imagenes = productoBase.imagenes
        const urlB = imagenes.filter(x => x._id == req.params.idImagen)
        urlB.map(async (imagen) => {
            await uploadFile.eliminarImagen(imagen.key_imagen);
            await ProductoModel.updateOne(
                {
                    _id: req.params.idProducto
                }, 
                {
                    $pull: {
                        imagenes: {
                            _id: imagen._id
                        }
                    }
                },
            );
        })
        res.status(200).json({message: "Imagen eliminada."});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error de registro", error});
    }
}

productoCtrl.updateProducto = async (req,res) => {
    try{
        const idProducto = req.params.idProducto;
        const productoUpdate = req.body;
        await ProductoModel.findByIdAndUpdate(idProducto, productoUpdate);
        res.status(200).json({message: "Producto agregado"});
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

productoCtrl.deleteProducto = async (req,res) => {
    try {
        const idProducto = req.params.idProducto;
        const productosAlmacenes = await AlmacenProductoModel.find().where({
            producto: idProducto
        });
        if(productosAlmacenes){
            if(productosAlmacenes.cantidad_existente > 0){
                res.status(500).json({ message: "No puede eliminar, aun hay productos en almacenes" });
            }else{
                await ProductoModel.findByIdAndUpdate(idProducto,{eliminado: true});
                res.status(200).json({message: "Producto eliminado"});
            }
        }else{
            await ProductoModel.findByIdAndUpdate(idProducto,{eliminado: true});
            res.status(200).json({message: "Producto eliminado"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error de registro", error});
    }
}

module.exports = productoCtrl;