const mongoose = require("mongoose");
var Float = require("mongoose-float").loadType(mongoose, 4);
const { Schema, model } = mongoose;

const ProductoMoviminetosSchema = new Schema(
  {
    id_compra: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: "Compras",
      trim: true,
    },
    id_traspaso: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: "Traspasos",
      trim: true,
    },
    id_producto: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: "Productos",
      trim: true,
    },
    datos_generales: {
      codigo_barras: String,
      clave_alterna: String,
      tipo_producto: String,
      nombre_comercial: String,
      nombre_generico: String,
      descripcion: String,
      id_categoria: {
        type: Schema.ObjectId,
        ref: "Categorias",
      },
      categoria: String,
      subcategoria: String,
      id_subcategoria: String,
      id_departamento: {
        type: Schema.ObjectId,
        ref: "Departamentos",
      },
      departamento: String,
      id_marca: {
        type: Schema.ObjectId,
        ref: "Marcas",
      },
      marca: String,
      clave_producto_sat: String,
      receta_farmacia: Boolean,
    },
    precios: {
      ieps: Float,
      ieps_activo: Boolean,
      inventario: {
        inventario_minimo: Number,
        inventario_maximo: Number,
        unidad_de_inventario: String,
      },
      iva: Float,
      iva_activo: Boolean,
      monedero: Boolean,
      monedero_electronico: Number,
      precio_de_compra: {
        precio_con_impuesto: Float,
        precio_sin_impuesto: Float,
        iva: Float,
        ieps: Float,
      },
      precios_producto: [
        {
          numero_precio: Number,
          precio_neto: Float,
          precio_venta: Float,
          unidad_mayoreo: Number,
          utilidad: Float,
        },
      ],
      unidad_de_compra: {
        cantidad: Number,
        precio_unitario_con_impuesto: Float,
        precio_unitario_sin_impuesto: Float,
        unidad: String,
      },
      granel: Boolean,
      litros: Boolean,
    },
    concepto: {
      type: String,
      require: true,
      trim: true,
    },
    cantidad: {
      type: Float,
      require: true,
    },
    medida: {
      id_medida: {
        type: Schema.Types.ObjectId,
        ref: "Productos",
        trim: true,
      },
      medida: String,
    },
    color: {
      id_color: {
        type: Schema.Types.ObjectId,
        ref: "Productos",
        trim: true,
      },
      color: String,
    },
    unidad: {
      type: String,
      require: true,
    },
    id_unidad_venta: {
      type: Schema.Types.ObjectId,
      ref: "Unidadesventa",
      trim: true,
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

module.exports = model("productosmovimientos", ProductoMoviminetosSchema);