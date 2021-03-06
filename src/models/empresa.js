const mongoose = require("mongoose");
const {Schema,model} = mongoose;

const EmpresaSchema = new Schema({
    nombre_empresa: String,
    telefono: {
        type: String,
        unique: true,
        trim: true
    },
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
    correo: {
        type: String,
        unique: true,
        trim: true
    },
    password: String,
    paquete: String,
    fecha_vencimiento: String,
    fecha_subscripcion: String,
    numero_mes_subscripcion: Number,
    numero_mes_vencimiento: Number
},{
    timestamps: true
})

module.exports = model("empresas",EmpresaSchema);