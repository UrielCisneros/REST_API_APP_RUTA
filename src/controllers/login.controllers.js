const loginCtrl = {};
//Librerias
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
//Modelos
const EmpresaModel = require('../models/empresa');
const SucuralModel = require('../models/sucursal');
const UsuarioModel = require('../models/usuarios');


loginCtrl.loginEmpresa = async (req,res) => {
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
            res.status(200).json({token});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error de registro", error}); 
    }
}

loginCtrl.LoginUsuario = async (req,res) => {
    try {
        const {
            email,
            password
        } = req.body;
        if(!email || !password){ res.status(500).json({message: "Usuario no encontrado"}); return;}
        const usuario = await UsuarioModel.findOne().where({correo: email.trim()});
        if(!usuario){ res.status(500).json({message: "Usuario no encontrado"}); return;}

        if(!bcrypt.compareSync(password,usuario.password)){
            res.status(404).json({ message: "Datos incorrectos." });
        }else{
            const token = jwt.sign(
                {
                    nombre: usuario.nombre,
                    telefono: usuario.telefono,
                    empresa: usuario.empresa,
                    tipo_acceso: usuario.tipo_acceso,
                    correo: usuario.correo
                },
                process.env.AUTH_KEY
            );
            res.status(200).json({token});
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error de registro", error}); 
    }
}

module.exports = loginCtrl;