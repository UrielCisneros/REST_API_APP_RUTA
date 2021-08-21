const mongoose = require("mongoose");
var Float = require('mongoose-float').loadType(mongoose,4);
const { Schema, model } = mongoose;

const SchemaAlmacen = new Schema(
    {
        fecha: Date,
        usuario: {
            type: Schema.ObjectId,
            ref:'usuarios'
        },
        cantidad: Float,
        observaciones: String
    },
    {
        timestamps: true
    }
);

module.exports = model("almacenes",SchemaAlmacen);