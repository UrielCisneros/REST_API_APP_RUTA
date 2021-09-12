const mongoose = require("mongoose");
var Float = require('mongoose-float').loadType(mongoose,4);
const { Schema, model } = mongoose;

const SchemaTraspasos = new Schema(
    {
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
            concepto: String,
            tipo: String
        },
        almacen_destino: {
            id: {
                type: Schema.ObjectId,
                ref:'almacenes'
            },
            nombre: String,
            concepto: String,
            tipo: String
        },
        productos: [
            {
                id: {
                    type: Schema.ObjectId,
                    ref:'productos'
                },
                codigo_barras: String,
                descripcion: String,
                cantidad_traspaso: Float,
                unidad_traspaso: String
            }
        ],
        id_empresa: {
            type: Schema.ObjectId,
            ref:'empresas'
        },
        id_sucursal: {
            type: Schema.ObjectId,
            ref:'empresas'
        },
        fecha: Date,
        hora: String,
    },
    {
        timestamps: true
    }
);

module.exports = model("traspasos",SchemaTraspasos);