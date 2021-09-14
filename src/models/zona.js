const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const zonaSchema = new Schema({
    zona: String,
    id_usuario: {
        type: Schema.ObjectId,
        ref:'usuarios'
    },
    empresa: {
        type: Schema.ObjectId,
        ref:'empresas'
    },
    sucursal: {
        type: Schema.ObjectId,
        ref:'sucursales'
    }
});

module.exports = model('zonas', zonaSchema);