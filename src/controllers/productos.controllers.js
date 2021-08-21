const productoCtrl = {};

productoCtrl.getProductos = (req,res) => {
    try {
        console.log('Productos');
        res.status(200).json({message: "Hecho"});
    } catch (error) {
        
    }
}

productoCtrl.getProductosGenerales = (req,res) => {
    try {
        console.log('Productos inventario');
        res.status(200).json({message: "Hecho"});
    } catch (error) {
        
    }
}

module.exports = productoCtrl;