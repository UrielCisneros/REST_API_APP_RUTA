const empresaCtrl = {};

empresaCtrl.getEmpresas = (req,res) => {
    try {
        console.log('Empresa');
        res.status(200).json({message: "Hecho"});
    } catch (error) {
        
    }
}

module.exports = empresaCtrl;