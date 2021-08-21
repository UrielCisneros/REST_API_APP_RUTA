const pagoComicionCtrl = {};

pagoComicionCtrl.getPagoComiciones = (req,res) => {
    try {
        console.log('Pago comiciones');
        res.status(200).json({message: "Hecho"});
    } catch (error) {
        
    }
}

module.exports = pagoComicionCtrl;