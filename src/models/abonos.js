const mongoose = require("mongoose");
var Float = require('mongoose-float').loadType(mongoose,4);
const { Schema, model } = mongoose;

const SchemaAbonos = new Schema(
    {
        f_tarjeta: String,
        fecha_creacion: String,
        semana_decobro: String,
        cliente:{
            nombre_ciente: String,
            _id: {
                type: Schema.ObjectId,
                ref:'usuarios'
            }
        },
        zona: {
            nombre_zona: String,
            _id: {
                type: Schema.ObjectId,
                ref:'zonas'
            }
        },
        cobrador: {
            type: Schema.ObjectId,
            ref:'usuarios'
        },
        saldo_anterior: Float,
        abono_correspondiente: Float,
        pago: Float,
        saldo_saliente: Float,
        comision_cobrador: Float,
        identificador: String,
        estatus_venta: String,
        motivo: String
    },
    {
        timestamps: true
    }
);

module.exports = model("almacenes",SchemaAbonos);