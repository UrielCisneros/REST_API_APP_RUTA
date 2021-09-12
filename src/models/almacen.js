const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const SchemaAlmacen = new Schema(
    {
        nombre_almacen: String,
        direccion: {
            calle: String,
            numero: {
                interior: String,
                exterior: String
            },
            colonia: String,
            ciudad: String,
            codigo_postal: String
        },
        id_empresa: {
            type: Schema.ObjectId,
            ref:'empresas'
        },
        id_sucursal: {
            type: Schema.ObjectId,
            ref:'sucursales'
        },
        inicial: Boolean,
        fecha_creacion: String,
        numero_mes_year_creacion: Number,
        year_de_creacion: Number,
    },
    {
        timestamps: true
    }
);

module.exports = model("almacenes",SchemaAlmacen);