const mongoose = require("mongoose");
var Float = require("mongoose-float").loadType(mongoose, 4);
const { Schema, model } = mongoose;

const SchemaCompras = new Schema(
    {
        usuario: {
          type: Schema.Types.ObjectId,
          ref: "usuarios",
          require: true,
          trim: true,
        },
        almacen: {
          id_almacen: {
            type: Schema.Types.ObjectId,
            require: true,
            ref: "almacenes",
            trim: true,
          },
          nombre_almacen: String,
        },
        proveedor: {
          id_proveedor: {
            type: Schema.ObjectId,
            ref: "clientes",
            require: true,
            trim: true,
          },
          clave_cliente: Number,
          numero_cliente: Number,
          nombre_cliente: String,
        },/* 
        productos: [
          {
            producto: {
              type: Schema.Types.ObjectId,
              require: true,
              ref: "Productos",
              trim: true,
            },
          },
        ], */
        impuestos: {
          type: Float,
          require: true,
        },
        subtotal: {
          type: Float,
          require: true,
        },
        total: {
          type: Float,
          require: true,
        },
        year_registro: String,
        numero_semana_year: String,
        numero_mes_year: String,
        fecha_registro: String,
      },
      {
        timestamps: true,
      }
);

module.exports = model("compras",SchemaCompras);