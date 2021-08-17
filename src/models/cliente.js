const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const clienteSchema = new Schema(
    {
        nombre: String,
        zona: String,
        domicilio: String,
        telefono: String,
        imagenes: {
            ine: {
                delantera: {
                    key: String,
                    url: String
                },
                trasera: {
                    key: String,
                    url: String
                }
            },
            fachada: {
                key: String,
                url: String
            }
        },
        status_buro: Boolean
    },{
        timestamps: true
    }
);

module.exports = model('clientes',clienteSchema);