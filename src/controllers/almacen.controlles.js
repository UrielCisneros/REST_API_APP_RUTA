const almacenCtrl = {};
//Modelos
const TraspasosModel = require('../models/traspasos');
const ProductoModel = require('../models/producto');
const AlmacenModel = require('../models/almacen');
const ProductoAlmacen = require('../models/productos_almacenes');
//Funciones
const { getSucursalPrincipalEmpresa } = require('../middleware/reuser');
const moment = require('moment');
// const sucursal = require('../models/sucursal');

almacenCtrl.getAlmacenes = async (req,res) => {
    try {
        const sucursal = await getSucursalPrincipalEmpresa(req.params.idEmpresa);
        if(!sucursal) res.status(500).json({message: "Error de servidor."});
        const almacenesSucursal = await AlmacenModel.find().where({id_empresa: req.params.idEmpresa, id_sucursal: sucursal._id});
        res.status(200).json(almacenesSucursal);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error de registro", error});
    }
}

almacenCtrl.createAlmacen = async (req,res) => {
    try {
        const {
            nombre_almacen,
            direccion
        } = req.body;
        const sucursal = await getSucursalPrincipalEmpresa(req.params.idEmpresa);
        if(!sucursal) res.status(500).json({message: "Error de servidor."});
        const hoy = moment();
        const newALmacen = new AlmacenModel({
            nombre_almacen,
            direccion: direccion ? direccion : {},
            id_empresa: req.params.idEmpresa,
            id_sucursal: sucursal._id,
            inicial: false,
            fecha_creacion: hoy,
            numero_mes_year_creacion: hoy.week(),
            year_de_creacion: hoy.year()
        });
        await newALmacen.save();
        res.status(200).json({message: "Almacen registrado"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error de registro", error});
    }
}

almacenCtrl.editAlmacen = async (req,res) => {
    try {
        console.log('edit Almacen');
        const {
            nombre_almacen,
            direccion
        } = req.body;

        await AlmacenModel.findByIdAndUpdate(req.params.idAlmacen,{nombre_almacen,direccion})

        res.status(200).json({message: "Almacen editado"});
    } catch (error) {
        res.status(500).json({message: "Error de registro", error});
    }
}

almacenCtrl.getTraspasosSucursal = async (req,res) => {
    try {
        const sucursal = await getSucursalPrincipalEmpresa(req.params.idEmpresa);
        if(!sucursal) res.status(500).json({message: "Error de servidor."})
        const traspasosSucursal = await TraspasosModel.find().where({id_empresa: req.params.idEmpresa, id_sucursal: sucursal._id }); 
        res.status(200).json(traspasosSucursal);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error de registro", error});
    }
}

almacenCtrl.getProductosAlmacenesEmpresa = async (req, res) => {
    try {
        const sucursal = await getSucursalPrincipalEmpresa(req.params.idEmpresa);
        if(!sucursal) res.status(500).json({message: "Error de servidor."});
        const filtro = req.query;
        let filtroMatch = {};
        if(filtro){
            filtroMatch = 
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
            filtroMatch =
            {
                $match: {
                    empresa: mongoose.Types.ObjectId(req.params.idEmpresa),
                    sucursal: mongoose.Types.ObjectId(sucursal._id),
                }
            };
        }
        const productos = await ProductoModel.aggregate(
            [
                filtroMatch,
                {
                    $lookup: {
                      from: "productoalmacenes",
                      let: { id: "$_id", empresa: `${req.params.idEmpresa}`, sucursal: `${sucursal._id}`},
                      pipeline: [
                        {
                          $match: {
                            $expr: { 
                              $and: [
                                { $eq: ["$producto", { $toObjectId: "$$id" }] },
                                { $eq: ["$empresa", { $toObjectId: "$$empresa" }] },
                                { $eq: ["$sucursal", { $toObjectId: "$$sucursal" }] }
                              ],
                            },
                          },
                        },
                        // {
                        //     $group: { 
                        //         _id: {
                        //             producto: "$producto._id",
                        //             almacen: "$id_almacen"
                        //         },
                        //         cantidad_existente: { $first: '$cantidad_existente' },
                        //         unidad_inventario: { $first: '$unidad_inventario' },
                        //         cantidad_existente_minima: { $first: '$cantidad_existente_minima' },
                        //         unidad_minima: { $first: '$unidad_minima' },
                        //         cantidad_existente_maxima: { $first: '$cantidad_existente_maxima' },
                        //         unidad_maxima: { $first: '$unidad_maxima' }
                        //     } 
                        // }
                      ],
                      as: `existencia_almacenes`,
                    },
                }
            ]
        );
        res.status(200).json(productos);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error de registro", error});
    }
}

almacenCtrl.createTraspaso = async (req,res) => {
    try {
        const { 
            usuario,
            almacen_origen,
            almacen_destino,
            productos
        } = req.body;
        const idEmpresa = req.params.idEmpresa;
        const sucursal = await getSucursalPrincipalEmpresa(idEmpresa);
        if(!sucursal) res.status(500).json({message: "Error de servidor."});
        //Mapear productos
        for(var i=0; i < productos.length; i++){
            //Verificar que existan esta cantidad en ese almacen
            const almacenProducto = await ProductoAlmacen.findOne().where({producto: productos[i]._id, empresa: idEmpresa, id_sucursal: sucursal._id });
            if(!almacenProducto) throw new Error("Produto de almacen no encontrado");
            if(productos[i].cantidad_traspaso > almacenProducto.cantidad_existente) throw new Error("Produto de almacen no encontrado");
        }

        //Mapear productos de nuevo pero para restar y sumar de almacenes

        //registrar y guardar traspaso

        //retornar respuesta
        res.status(200).json({message: 'Traspaso realizado'})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error de registro", error});
    }
}

module.exports = almacenCtrl;