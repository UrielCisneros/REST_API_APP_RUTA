const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const SchemaAlmacen = new Schema(
    {
        fecha: Date,
        hora: String,
        usuario: {
            id: {
                type: Schema.ObjectId,
                ref:'usuarios'
            },
            nombre: String,
            telefono: String,
            correo: {
                type: String,
                trim: true
            },
        },
        almacen_origen: {
            id: {
                type: Schema.ObjectId,
                ref:'almacenes'
            },
            nombre: String,
            concepto: String
        },
        almacen_destino: {
            id: {
                type: Schema.ObjectId,
                ref:'almacenes'
            },
            nombre: String,
            concepto: String
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
        id_empresa: {
            type: Schema.ObjectId,
            ref:'empresas'
        }
    },
    {
        timestamps: true
    }
);

module.exports = model("almacenes",SchemaAlmacen);