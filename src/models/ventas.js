const mongoose = require("mongoose");
var Float = require('mongoose-float').loadType(mongoose,4);
const { Schema, model } = mongoose;

const SchemaVentas = new Schema(
    {
        tarjeta: String,
        fecha: Date,
        vendedor: {
            id: {
                type: Schema.ObjectId,
                ref:'usuarios'
            },
            nombre: String,
            telefono: String,
            correo_electronico: String 
        },
        frecuencia_del_cobro: String,
        dia_cobro: String,
        subtotal: Float,
        descuento: {
            porsentaje: Float,
            precio: Float,
        },
        total_ventas: Float,
        enganche: Float,
        enganche_a_pagar: Float,
        enganche_pagado: Float,
        sobre_enganche: Float,
        enganche_pendiente: Float,
        saldo_restante: Float,
        abono_correspondiente: Float,
        pago_comicion: Float,
        observacion: String,
        fecha_vencimiento: Date,
        estatus_cuenta: String
    },
    {
        timestamps: true
    }
);

module.exports = model("ventas",SchemaVentas);