const mongoose = require("mongoose");
var Float = require('mongoose-float').loadType(mongoose,4);
const { Schema, model } = mongoose;

const SchemaProducto = new Schema(
    {
        codigo_barras: String,
        descripcion: String,
        costo: Float,
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