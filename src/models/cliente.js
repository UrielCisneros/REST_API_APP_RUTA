const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const clienteSchema = new Schema(
    {
        nombre: String,
        zona: String,
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
        status_buro: Boolean,
        id_empresa: {
            type: Schema.ObjectId,
            ref:'empresas'
        }
    },{
        timestamps: true
    }
);

module.exports = model('clientes',clienteSchema);