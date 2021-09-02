const comprasCtrl = {};

comprasCtrl.getCompras = async (req,res) => {
    try {
        console.log('Compras');
        res.status(200).json({message: "Hecho"});
    } catch (error) {
        
    }
}

module.exports = comprasCtrl;