const usuariosCtrl = {};
const UsuariosModel = require('../models/usuarios');
const bcrypt = require('bcrypt-nodejs');
const ZonaModel = require('../models/zona');
const { getSucursalPrincipalEmpresa } = require('../middleware/reuser');


usuariosCtrl.getUsuario = async (req,res) => {
    try {
        const usuarios_empresa = await UsuariosModel.findById(req.params.idUsuario);
        res.status(200).json(usuarios_empresa);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error de registro", error});
    }
}

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

usuariosCtrl.createCliente = async (req,res) => {
    try {
        const {
            codigo_cliente,
            nombre,
            zona,
            direccion,
            telefono,
            status_buro,
            precio_predeterminado,
            saldo
        } = req.body;

        const newCliente = new UsuariosModel({
            codigo_cliente,
            nombre,
            zona,
            direccion,
            telefono,
            status_buro,
            precio_predeterminado,
            saldo
        });
        await newCliente.save();
        res.status(200).json({message: "Cliente agregado"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error de registro", error});
    }
}

usuariosCtrl.editCliente = async (req,res) => {
    try {
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error de registro", error});
    }
}

usuariosCtrl.createZona = async (req,res) => {
    try {
        const {
            zona,
            id_usuario
        } = req.body;
        const sucursal = await getSucursalPrincipalEmpresa(req.params.idEmpresa);
        if(!sucursal) res.status(500).json({message: "Error de servidor."});
        const newZona = new ZonaModel({
            zona,
            id_usuario,
            sucursal: sucursal._id,
            empresa: req.params.idEmpresa
        });
        await newZona.save();
        res.status(200).json({message: "Zona agregada"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error de registro", error});
    }
}

usuariosCtrl.editZona = async (req,res) => {
    try {
        const {
            zona,
            id_usuario
        } = req.body;
        await ZonaModel.findByIdAndUpdate(req.params.idZona,{zona,id_usuario});
        res.status(200).json({message: "Zona editada"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error de registro", error});
    }
}

usuariosCtrl.deleteZona = async (req,res) => {
    try {
        const zona = await ZonaModel.findById(req.params.idZona);
        if(zona){
            await ZonaModel.findByIdAndDelete(req.params.idZona);
            res.status(200).json({message: "Zona eliminada"});
        }else{
            res.status(404).json({message: "La zona no existe"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error de registro", error});
    }
}

module.exports = usuariosCtrl;