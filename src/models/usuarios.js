const mongoose = require('mongoose');
const {Schema, model} = mongoose;
const Usuarios = new Schema(
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
        },
        tipo: String,
        tipo_acceso: String,
        precio_predeterminado: {
            numero_precio: Number,
            precio_neto: Float,
            precio_venta: Float,
            unidad_mayoreo: Number,
            utilidad: Float,
            unitario: Boolean
        },
        saldo: Float,
        saldo_en_uso: FLoat,
        correo_electronico: String
    },{
        timestamps: true
    }
);

module.exports = model('usuarios',Usuarios);