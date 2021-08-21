const proveedorCtrl = {};

proveedorCtrl.getProveedores = (req,res) => {
    try {
        console.log('Proveedores');
        res.status(200).json({message: "Hecho"});
    } catch (error) {
        
    }
}

module.exports = proveedorCtrl;