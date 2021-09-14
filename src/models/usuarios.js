const mongoose = require('mongoose');
var Float = require('mongoose-float').loadType(mongoose,4);
const {Schema, model} = mongoose;

const UsuariosSchema = new Schema(
    {
        codigo_cliente: String,
        nombre: String,
        zona: {
            id: {
                type: Schema.ObjectId,
                ref:'zonas' 
            },
            nombre_reparidor: String,
            id_repartidor: {
                type: Schema.ObjectId,
                ref:'usuarios'
            }
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
        empresa: {
            type: Schema.ObjectId,
            ref:'empresas'
        },
        sucursal: {
            type: Schema.ObjectId,
            ref:'sucursales'
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
        saldo_en_uso: Float,
        correo: {
            type: String,
            unique: true,
            trim: true
        },
        password: String
    },{
        timestamps: true
    }
);

module.exports = model('usuarios',UsuariosSchema);
