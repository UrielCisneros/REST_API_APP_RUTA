const almacenCtrl = {};

almacenCtrl.getAlmacenes = (req,res) => {
    try {
        console.log('Almacen');
        res.status(200).json({message: "Hecho"});
    } catch (error) {
        
    }
}

module.exports = almacenCtrl;