const traspasosCtrl = {};

traspasosCtrl.getTraspasos = async (req,res) => {
    try {
        console.log('Traspasos');
        res.status(200).json({message: "Hecho"});
    } catch (error) {
        
    }
}

module.exports = traspasosCtrl;