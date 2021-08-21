const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const SchemaAlmacen = new Schema(
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
        almcane_destino: {
            id: {
                type: Schema.ObjectId,
                ref:'almacenes'
            },
            nombre: String
        },
        productos: [
            {
                id: {
                    type: Schema.ObjectId,
                    ref:'productos'
                },
                codigo_barras: String,
                descripcion: String,
            }
        ],
        observaciones: String
    },
    {
        timestamps: true
    }
);

module.exports = model("almacenes",SchemaAlmacen);