const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const SchemaInventario = new Schema(
    {
        id_empresa: {
            type: Schema.ObjectId,
            ref:'empresas'
        },
        id_producto: {
            type: Schema.ObjectId,
            ref:'empresas'
        },
        id_almacen: {
            type: Schema.ObjectId,
            ref:'empresas'
        },
        cantidad: Number
    },
    {
        timestamps: true
    }
);

module.exports = model("inventarios",SchemaInventario);