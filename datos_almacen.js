switch(precios.unidad_de_compra.unidad){
    case 'KILOGRAMOS':
        inventarioGeneralBase = await inventarioGeneral(
            datos_generales, //Datos generales del primer modulo
            precios, //Datos del precio segundo modulo
            parseInt(almacen_inicial.cantidad) * 1000, //Cantidas minima (Gramos, Piezas)
            'KILOGRAMOS', //Unidad en la cual estara el producto guardado en unidad minima para control interno (Kilos, Piezas)
            'GRAMOS', //Unidad minima en la cual se guardara en la base
            parseInt(almacen_inicial.cantidad),//Unidad de como se quiere guardar en inventario
            parseInt(almacen_inicial.cantidad),//Cantidad que hay en inventario dependiendo la unidad de inventario
            empresa,//Id de la empresa
            sucursal,//Id de la sucursal
            newProductoBase._id,//Id del producto
            precios.inventario.inventario_minimo ? precios.inventario.inventario_minimo : 0,//Aqui se agrega el registro del inventario minimo
            precios.inventario.inventario_maximo ? precios.inventario.inventario_maximo : 0,//Aqui se agrega el registro del inventario maximo
            precios.unidad_de_compra//Las unidades de compra para saber si es costal o cajas, y su cantidad.
        );
        if(!inventarioGeneralBase){
            throw new Error("Dato no valido");
        }
        break;
    case 'CAJAS':
        inventarioGeneralBase = await inventarioGeneral(
            datos_generales, //Datos generales del primer modulo
            precios, //Datos del precio segundo modulo
            parseInt(almacen_inicial.cantidad) * parseInt(precios.unidad_de_compra.cantidad), //Cantidas minima (Gramos, Piezas)
            'CAJAS', //Unidad en la cual estara el producto guardado en unidad minima para control interno (Kilos, Piezas)
            'PIEZAS', //Unidad minima en la cual se guardara en la base
            parseFloat(almacen_inicial.cantidad),//Unidad de como se quiere guardar en inventario
            parseInt(almacen_inicial.cantidad) * parseInt(precios.unidad_de_compra.cantidad),//Cantidad que hay en inventario dependiendo la unidad de inventario
            empresa,//Id de la empresa
            sucursal,//Id de la sucursal
            newProductoBase._id,//Id del producto
            precios.inventario.inventario_minimo ? precios.inventario.inventario_minimo : 0,//Aqui se agrega el registro del inventario minimo
            precios.inventario.inventario_maximo ? precios.inventario.inventario_maximo : 0,//Aqui se agrega el registro del inventario maximo
            precios.unidad_de_compra//Las unidades de compra para saber si es costal o cajas, y su cantidad.
        );
        if(!inventarioGeneralBase){
            throw new Error("Dato no valido");
        }
        break;
    case 'PIEZAS':
        inventarioGeneralBase = await inventarioGeneral(
            datos_generales, //Datos generales del primer modulo
            precios, //Datos del precio segundo modulo
            parseInt(almacen_inicial.cantidad), //Cantidas minima (Gramos, Piezas)
            'PIEZAS', //Unidad en la cual estara el producto guardado en unidad minima para control interno (Kilos, Piezas)
            'PIEZAS', //Unidad minima en la cual se guardara en la base
            parseFloat(almacen_inicial.cantidad),//Unidad de como se quiere guardar en inventario
            parseInt(almacen_inicial.cantidad),//Cantidad que hay en inventario dependiendo la unidad de inventario
            empresa,//Id de la empresa
            sucursal,//Id de la sucursal
            newProductoBase._id,//Id del producto
            precios.inventario.inventario_minimo ? precios.inventario.inventario_minimo : 0,//Aqui se agrega el registro del inventario minimo
            precios.inventario.inventario_maximo ? precios.inventario.inventario_maximo : 0,//Aqui se agrega el registro del inventario maximo
            precios.unidad_de_compra//Las unidades de compra para saber si es costal o cajas, y su cantidad.
        );
        if(!inventarioGeneralBase){
            throw new Error("Dato no valido");
        }
        break;
    case 'COSTALES':
        inventarioGeneralBase = await inventarioGeneral(
            datos_generales, //Datos generales del primer modulo
            precios, //Datos del precio segundo modulo
            (parseInt(almacen_inicial.cantidad) * parseInt(precios.unidad_de_compra.cantidad)) * 1000, //Cantidas minima (Gramos, Piezas)
            'KILOGRAMOS', //Unidad en la cual estara el producto guardado en unidad minima para control interno (Kilos, Piezas)
            'GRAMOS', //Unidad minima en la cual se guardara en la base
            parseFloat(almacen_inicial.cantidad),//Unidad de como se quiere guardar en inventario
            parseInt(almacen_inicial.cantidad) * parseInt(precios.unidad_de_compra.cantidad),//Cantidad que hay en inventario dependiendo la unidad de inventario
            empresa,//Id de la empresa
            sucursal,//Id de la sucursal
            newProductoBase._id,//Id del producto
            precios.inventario.inventario_minimo ? precios.inventario.inventario_minimo : 0,//Aqui se agrega el registro del inventario minimo
            precios.inventario.inventario_maximo ? precios.inventario.inventario_maximo : 0,//Aqui se agrega el registro del inventario maximo
            precios.unidad_de_compra//Las unidades de compra para saber si es costal o cajas, y su cantidad.
        );
        if(!inventarioGeneralBase){
            throw new Error("Dato no valido");
        }
        break;
    case 'LITROS':
        inventarioGeneralBase = await inventarioGeneral(
            datos_generales, //Datos generales del primer modulo
            precios, //Datos del precio segundo modulo
            parseInt(almacen_inicial.cantidad) * 1000, //Cantidas minima (Gramos, Piezas)
            'LITROS', //Unidad en la cual estara el producto guardado en unidad minima para control interno (Kilos, Piezas)
            'MILILITROS', //Unidad minima en la cual se guardara en la base
            parseFloat(almacen_inicial.cantidad),//Unidad de como se quiere guardar en inventario
            parseInt(almacen_inicial.cantidad),//Cantidad que hay en inventario dependiendo la unidad de inventario
            empresa,//Id de la empresa
            sucursal,//Id de la sucursal
            newProductoBase._id,//Id del producto
            precios.inventario.inventario_minimo ? precios.inventario.inventario_minimo : 0,//Aqui se agrega el registro del inventario minimo
            precios.inventario.inventario_maximo ? precios.inventario.inventario_maximo : 0,//Aqui se agrega el registro del inventario maximo
            precios.unidad_de_compra//Las unidades de compra para saber si es costal o cajas, y su cantidad.
        );
        if(!inventarioGeneralBase){
            throw new Error("Dato no valido");
        }
        break;
    default:
        throw new Error("Dato no valido");
}
//Buscamos el lote inicial del almacen seleccionado
const lotesInicialBase = await LoteModel.findOne({ id_almacen: almacen_inicial.id_almacen, lote_inicial: true });
//Registro de lote inicial
newProductoLote = new ProductosLoteModel({
    unidad_de_compra: precios.unidad_de_compra,
    codigo_barras: datos_generales.codigo_barras,
    nombre_comercial: datos_generales.nombre_comercial ? datos_generales.nombre_comercial : "",
    nombre_generico: datos_generales.nombre_generico ? datos_generales.nombre_generico : "",
    id_categoria: datos_generales.id_categoria ? datos_generales.id_categoria : "",
    categoria: datos_generales.categoria ? datos_generales.categoria : "",
    subcategoria: datos_generales.subcategoria ? datos_generales.subcategoria : "",
    receta_farmacia: datos_generales.receta_farmacia ? datos_generales.receta_farmacia : false,
    id_marca: datos_generales.id_marca ? datos_generales.id_marca : "",
    marca: datos_generales.marca ? datos_generales.marca : "",
    cantidad_lote: almacen_inicial.cantidad ? almacen_inicial.cantidad : "",
    id_producto: newProductoBase._id,
    id_almacen: almacen_inicial.id_almacen,
    id_empresa: empresa,
    id_sucursal: sucursal,
    id_lote: lotesInicialBase._id,
    cantidad_minima_inventario: inventarioGeneralBase.cantidad_minima_inventario,
    unidad_producto: inventarioGeneralBase.unidad_producto,
    unidad_producto_minima: inventarioGeneralBase.unidad_producto_minima,
    cantidad_agrupada: inventarioGeneralBase.cantidad_agrupada,
    cantidad_unitaria: inventarioGeneralBase.cantidad_unitaria,
    origen_registro: "Producto"
});


//Verificamos si hay informacion de almacen inicial
if(almacen_inicial.id_almacen !== ""){
    await inventarioGeneralBase.save();
    await newProductoLote.save();
}