const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const SchemaCompras = new Schema(
    {
        fecha: Date,
        proveedor: {
            nombre: String,
            telefono: String,
            correo_electronico: String,
            id: {
                type: Schema.ObjectId,
                ref:'proveedores'
            },
        },
        almacen_destino: {
            id: {
                type: Schema.ObjectId,
                ref:'almacenes'
            },
            nombre: String
        },
        observaciones: String
    },
    {
        timestamps: true
    }
);

module.exports = model("compras",SchemaCompras);