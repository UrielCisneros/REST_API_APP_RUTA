const usuariosCtrl = {};
const UsuariosModel = require('../models/usuarios');
const bcrypt = require('bcrypt-nodejs');
const ZonaModel = require('../models/zona');
const { getSucursalPrincipalEmpresa } = require('../middleware/reuser');
const uploadFile = require("../middleware/uploadFile");


usuariosCtrl.uploadFileAwsS3 = (req, res, next) => {
	uploadFile.upload(req, res, function (err) {
		if (err) {
			res.status(404).json({ message: "Formato de imagen no valido", err });
		}else{
            return next();
        }	
	});
};

//Usuarios
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
                password: hash,
                tipo: 'Usuario'
            });
            await newUser.save();
            res.status(200).json({message: "Usuario registrado exitosamente."});
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error de registro", error});
    }
}

usuariosCtrl.editUsuario = async (req,res) => {
    try {
        const {
            nombre,
            tipo_acceso,
            telefono
        } = req.body;
        if(!nombre || !tipo_acceso || !telefono) res.status(500).json({message: "Datos incompletos"});
        await UsuariosModel.findByIdAndUpdate(req.params.idUsuario, {nombre,tipo_acceso,telefono});
        res.status(200).json({message: "Usuario editado."});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error de registro", error});
    }
}

//Clientes
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
            saldo,
            tipo: 'Cliente'
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
        const {
            nombre,
            zona,
            direccion,
            status_buro,
            precio_predeterminado,
            saldo
        } = req.body;
        if(!nombre || !zona || !direccion || !status_buro || !precio_predeterminado || !saldo) res.status(500).json({message: "Datos incompletos"});
        await UsuariosModel.findByIdAndUpdate(req.params.idCliente, {nombre,zona,direccion,status_buro,precio_predeterminado,saldo});
        res.status(200).json({message: "Cliente editado"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error de registro", error});
    }
}

usuariosCtrl.uploadImagenCliente = async (req,res) => {
    try {
        const imagen = req.params.imagenAgregar;
        const usuario = await UsuariosModel.findById(req.params.idUsuario);
        let newUsuario = usuario;

        if(imagen === 'delantera' && req.file){
            if(usuario.imagenes.ine.delantera.key) await uploadFile.eliminarImagen(usuario.imagenes.ine.delantera.key);
            newUsuario.imagenes.ine.delantera.key = req.file.key;
            newUsuario.imagenes.ine.delantera.url = req.file.location;
        }
        if(imagen === 'trasera' && req.file){
            if(usuario.imagenes.ine.trasera.key) await uploadFile.eliminarImagen(usuario.imagenes.ine.trasera.key);
            newUsuario.imagenes.ine.trasera.key = req.file.key;
            newUsuario.imagenes.ine.trasera.url = req.file.location;
        }
        if(imagen === 'fachada' && req.file){
            if(usuario.imagenes.fachada.key) await uploadFile.eliminarImagen(usuario.imagenes.fachada.key);
            newUsuario.imagenes.fachada.key = req.file.key;
            newUsuario.imagenes.fachada.url = req.file.location;
        }
        await UsuariosModel.findByIdAndUpdate(req.params.idUsuario, newUsuario);
        res.status(200).json({message: "Imagen agregada"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error de registro", error});
    }
}

//Proveedores
usuariosCtrl.createProveedores = async (req,res) => {
    try {
        const {
            nombre,
            direccion,
            telefono,
            correo
        } = req.body;
        const sucursal = await getSucursalPrincipalEmpresa(req.params.idEmpresa);
        if(!sucursal){
            res.status(500).json({message: 'Error de servidor.'})
            return;
        }
        if(!nombre || !direccion || !telefono || !correo){
            res.status(500).json({message: 'Datos incompletos.'})
            return;
        }
        const newProveedor = new UsuariosModel({
            nombre,
            direccion,
            telefono,
            correo,
            tipo: "Proveedor",
            empresa: req.params.idEmpresa,
            sucursal: sucursal._id
        });
        await newProveedor.save();
        res.status(200).json({message: "Proveedor agregado."});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error de registro", error});
    }
}

usuariosCtrl.editProveedores = async (req,res) => {
    try {
        const {
            nombre,
            direccion,
            telefono, 
        } = req.body;
        if(!nombre || !telefono || !direccion || !direccion.calle || !direccion.colonia || !direccion.ciudad || !direccion.codigo_postal){
            res.status(500).json({message: 'Datos incompletos.'})
            return;
        }
        await UsuariosModel.findByIdAndUpdate(req.params.idProveedor, {nombre, direccion, telefono });
        res.status(200).json({message: "Proveedor editado."});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error de registro", error}); 
    }
}

usuariosCtrl.deleteProveedores = async (req,res) => {
    try {
        const proveedor = await UsuariosModel.findById(req.params.idProveedor);
        if(proveedor){
            await UsuariosModel.findByIdAndDelete(req.params.idProveedor);
            res.status(200).json({message: "Proveedor eliminado."});
        }else{
            res.status(500).json({message: "Proveedor no encontrado."});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error de registro", error});
    }
}

//Zonas
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