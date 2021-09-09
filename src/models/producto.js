const mongoose = require("mongoose");
var Float = require('mongoose-float').loadType(mongoose,4);
const { Schema, model } = mongoose;

const SchemaProducto = new Schema(
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
        imagenes: [
			{
				key_imagen: String,
				location_imagen: String
			}
		],
        precios_plazos:[
            {
                plazo: String,
                precio: Float	
            }
        ],
        fecha_creacion: String,
        numero_mes_creacion: Number,
        year_de_creacion: Number,
        id_empresa: {
            type: Schema.ObjectId,
            ref:'empresas'
        },
        id_sucursal: {
            type: Schema.Types.ObjectId,
            ref: "sucursales",
            trim: true,
        },
        eliminado: Boolean
    },
    {
        timestamps: true
    }
);

module.exports = model("productos",SchemaProducto);