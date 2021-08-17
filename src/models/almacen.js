const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const SchemaAlmacen = new Schema(
    {
        nombre_almacen: String,
        id_empresa: {
            type: Schema.ObjectId,
            ref:'empresas'
        },
        inicial: Boolean,
        concepto: String
    },
    {
        timestamps: true
    }
);

module.exports = model("almacenes",SchemaAlmacen);