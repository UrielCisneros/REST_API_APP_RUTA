const mongoose = require('mongoose');
var Float = require('mongoose-float').loadType(mongoose,4);
const {Schema, model} = mongoose;

const ProductoAlmacenSchema = new Schema(
    {
        datos_generales: {
            codigo_barras: String,
            descripcion: String,
        },
        precios: {
            ieps: Float,
			ieps_activo: Boolean,
            iva: Float,
			iva_activo: Boolean,
			precio_de_compra: {
				precio_con_impuesto: Float,
				precio_sin_impuesto: Float,
				iva: Float,
				ieps: Float
			},
            precios_producto: [
                {
                    numero_precio: Number,
                    precio_neto: Float,
                    precio_venta: Float,
                    unidad_mayoreo: Number,
                    utilidad: Float,
                    unitario: Boolean
                }
            ],
            unidad_de_compra: {
				cantidad: Number,
				precio_unitario_con_impuesto: Float,
        		precio_unitario_sin_impuesto: Float,
				unidad: String,
			},
            granel: Boolean
        },
        cantidad_agregada: Float,
        cantidad_existente: Float,
        unidad_inventario: String,
        cantidad_existente_minima: Float,
        unidad_minima: String,
        cantidad_existente_maxima: Float,
        unidad_maxima: String,
        producto: {
            type: Schema.Types.ObjectId,
            require: true,
            ref: "productos",
            trim: true,
        },
        empresa: {
            type: Schema.Types.ObjectId,
            require: true,
            ref: "empresas",
            trim: true,
        },
        sucursal: {
            type: Schema.Types.ObjectId,
            ref: "sucursales",
            trim: true,
        },
        id_almacen: {
            type: Schema.Types.ObjectId,
            ref: "almacenes",
            trim: true, 
        },
        id_compra: {
            type: Schema.Types.ObjectId,
            ref: "usuarios",
            trim: true, 
        }
    },{
        timestamps: true
    }
);

module.exports = model('productoalmacenes',ProductoAlmacenSchema);