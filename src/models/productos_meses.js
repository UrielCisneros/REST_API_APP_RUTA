const mongoose = require("mongoose");
var Float = require('mongoose-float').loadType(mongoose,4);
const { Schema, model } = mongoose;

const SchemaProductoMeses = new Schema(
    {
        id_producto: {
            type: Schema.ObjectId,
            ref:'productos'
        },
        precio: Float,
        plazo: String,
        id_empresa: {
            type: Schema.ObjectId,
            ref:'empresas'
        }
    },
    {
        timestamps: true
    }
);

module.exports = model("productosmeses",SchemaProductoMeses);