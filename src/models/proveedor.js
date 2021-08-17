const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const SchemaProveedor = new Schema(
    {
        nombre: String,
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
        telefono: String,
        correo_electronico: String
    },
    {
        timestamps: true
    }
);

module.exports = model("proveedores",SchemaProveedor);