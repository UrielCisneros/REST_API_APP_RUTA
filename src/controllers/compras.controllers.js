const comprasCtrl = {};

comprasCtrl.getCompras = async (req,res) => {
    try {
        console.log('Compras');
        res.status(200).json({message: "Hecho"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error de registro", error});
    }
}

comprasCtrl.createCompra = async (req,res) => {
    try {
        const {
            
        } = req.body;
        console.log('Compras');
        res.status(200).json({message: "Hecho"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error de registro", error});
    }
}

module.exports = comprasCtrl;