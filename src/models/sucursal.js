const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const sucursalSchema = new Schema({
    nombre_sucursal: String,
    sucursal_principal: Boolean,
    usuario_ingreso: String,
    password_sucursal: String,
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
        type: Schema.Types.ObjectId,
        ref: "Empresa",
        require: true
    }
});

module.exports = model("empresas", sucursalSchema);