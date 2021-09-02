const usuariosCtrl = {};
const UsuariosModel = require('../models/usuarios');
const bcrypt = require('bcrypt-nodejs');

usuariosCtrl.getUsuariosEmpresas = async (req,res) => {
    try {
        const usuarios_empresa = await UsuariosModel.find().where({empresa: req.params.idEmpresa, tipo: 'Usuario'});
        res.status(200).json(usuarios_empresa);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error de registro", error});
    }
}

usuariosCtrl.createUsuario = async (req,res) => {
    try {
        const {
            correo,
            nombre,
            telefono,
            tipo_acceso,
            password, 
            repeatPassword, 
        } = req.body;

        const correo_limpio = correo.trim();
        if(!correo_limpio || !nombre || !telefono || !tipo_acceso || !password || !repeatPassword || password !== repeatPassword) { 
            res.status(500).json({message: "Datos incompletos."});
            return;
        }
        bcrypt.hash(password, null, null, async (err,hash) => {
            if(err) res.status(500).json({ message: "Ocurrio un error", err });
            const newUser = new UsuariosModel({
                correo: correo_limpio,
                nombre,
                telefono,
                empresa: req.params.idEmpresa,
                tipo_acceso,
                password: hash
            });
            await newUser.save();
            res.status(200).json({message: "Usuario registrado exitosamente."});
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error de registro", error});
    }
}



module.exports = usuariosCtrl;