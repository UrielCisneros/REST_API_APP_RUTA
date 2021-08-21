const clienteCtrl = {};

clienteCtrl.getUsuarios = (req,res) => {
    try {
        console.log('Usuarios');
        res.status(200).json({message: "Hecho"});
    } catch (error) {
        
    }
}

module.exports = clienteCtrl;