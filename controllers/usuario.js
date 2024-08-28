const Usuario = require('../model/usuario');
const bcrypt = require('bcryptjs');


// Crear un nuevo usuario
exports.createUsuario = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.USU_Password, 10);
        const newUser = { ...req.body, USU_Password: hashedPassword };
        const usuario = await Usuario.create(newUser);
        res.status(201).json(usuario);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el usuario' });
    }
};

// Obtener todos los usuarios
exports.getAllUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
};


// Actualizar un usuario existente
exports.updateUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);
        if (usuario) {
            const updatedData = { ...req.body };
            if (updatedData.USU_Password) {
                updatedData.USU_Password = await bcrypt.hash(updatedData.USU_Password, 10);
            }
            await usuario.update(updatedData);
            res.json(usuario);
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
};

