const ventasCtrl = {};

ventasCtrl.getVentas = (req,res) => {
    try {
        console.log('Ventas');
        res.status(200).json({message: "Hecho"});
    } catch (error) {
        
    }
}

module.exports = ventasCtrl;