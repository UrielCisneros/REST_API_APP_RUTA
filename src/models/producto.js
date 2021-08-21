const mongoose = require("mongoose");
var Float = require('mongoose-float').loadType(mongoose,4);
const { Schema, model } = mongoose;

const SchemaProducto = new Schema(
    {
        codigo_barras: String,
        descripcion: String,
        precios: [
            {
                numero_precio: Number,
                precio_neto: Float,
                precio_venta: Float,
                unidad_mayoreo: Number,
                utilidad: Float,
                unitario: Boolean
            }
        ],
        precios_plazos:[
            {
                plazo: String,
                precio: Float	
            }
        ],
        contado: Float,
        id_empresa: {
            type: Schema.ObjectId,
            ref:'empresas'
        }
    },
    {
        timestamps: true
    }
);

module.exports = model("productos",SchemaProducto);