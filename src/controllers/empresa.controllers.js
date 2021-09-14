const empresaCtrl = {};
const moment = require('moment');
const EmpresaModel = require('../models/empresa');
const bcrypt = require('bcrypt-nodejs');
const SucursalModel = require('../models/sucursal');
const AlmacenModel = require('../models/almacen');


empresaCtrl.getEmpresa = async (req,res) => {
    try {
        const empresas = await EmpresaModel.findById(req.params.idEmpresa);
        res.status(200).json(empresas);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error de registro", error});
    }
}

empresaCtrl.createEmpresa = async (req,res) => {
    try {
        const { 
            nombre_empresa, 
            telefono, 
            direccion, 
            correo, 
            password, 
            repeatPassword, 
            paquete 
        } = req.body;
        // console.log(req.body);
        const hoy = moment();
        let vencimiento = '';
        if(!password || !repeatPassword || password !== repeatPassword) res.status(404).json({message: "Algo salio mal, verificar los campos."});
        bcrypt.hash(password, null, null, async (err,hash) => {
            if(err) res.status(500).json({ message: "Ocurrio un error", err });
            switch(paquete){
                case 1:
                    vencimiento = hoy.clone().add(1,'M');
                    break;
                default:
                    break;
            }
            const newEmpresa = new EmpresaModel({
                nombre_empresa,
                telefono,
                direccion,
                correo,
                password: hash,
                fecha_vencimiento: vencimiento,
                fecha_subscripcion: hoy,
                paquete,
                numero_mes_subscripcion: hoy.week(),
                numero_mes_vencimiento: vencimiento.week()
            });
            const newSucursal = new SucursalModel({
                nombre_sucursal: nombre_empresa,
                sucursal_principal: true,
                password_sucursal: hash,
                usuario_ingreso: "12345",
                direccion,
                id_empresa: newEmpresa._id
            });
            const almacenPrincipal = new AlmacenModel({
                nombre_almacen: "Almacen inicial",
                id_empresa: newEmpresa._id,
                id_sucursal: newSucursal._id,
                inicial: true,
                concepto: 'Inicial'
            });
            await newEmpresa.save();
            await newSucursal.save();
            await almacenPrincipal.save();
            res.status(200).json({message: "Empresa registrada exitosamente."});
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error de registro", error});
    }
}

empresaCtrl.editEmpresa = async (req,res) => {
    try {
        const {
            nombre_empresa,
            direccion
        } = req.body;

        await EmpresaModel.findByIdAndUpdate(req.params.idEmpresa, {nombre_empresa, direccion});

        res.status(200).json({message: "Empresa editada."});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error de registro", error});
    }
}

module.exports = empresaCtrl;