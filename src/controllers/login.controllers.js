const loginCtrl = {};
//Librerias
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
//Modelos
const EmpresaModel = require('../models/empresa');
const SucuralModel = require('../models/sucursal');


loginCtrl.loginEmpresa = (req,res) => {
    try {
        const {
            email,
            password
        } = req.body;
        if(!email || !password){ res.status(500).json({message: "Empresa no encontrada"}); return;}
        const empresa = await EmpresaModel.findOne().where({correo: email.trim()});
        if(!empresa){ res.status(500).json({message: "Empresa no encontrada"}); return;}
        if(!bcrypt.compareSync(password,empresa.password)){
            res.status(404).json({ message: "Datos incorrectos." });
        }else{
            const sucursal = await SucuralModel.findOne().where({id_empresa: empresa._id, sucursal_principal: true});
            const token = jwt.sign(
                {
                    empresa,
                    sucursal
                },
                process.env.AUTH_KEY
            );
            res.status(200).json(token);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error de registro", error}); 
    }
}

module.exports = loginCtrl;