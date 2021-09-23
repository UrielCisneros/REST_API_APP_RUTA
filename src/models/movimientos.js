const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const movimientosSchema = new Schema(
    {
        
    },
    {
        timestamps: true
    }
);

module.exports = model(movimientosSchema, "movimientos");