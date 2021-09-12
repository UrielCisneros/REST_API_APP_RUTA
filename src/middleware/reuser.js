const reuserCtrl = {};
const SucursalModel = require('../models/sucursal');

reuserCtrl.getSucursalPrincipalEmpresa = async (idEmpresa) => {
    try {
        const sucursal = await SucursalModel.findOne().where({id_empresa: idEmpresa, sucursal_principal: true});
        return sucursal;
    } catch (error) {
        return false;
    }
}

module.exports = reuserCtrl;

