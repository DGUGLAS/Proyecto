
const sequelize = require('../config/db');
const Rol = require('../model/rol');

// Crear un nuevo rol
exports.createRol = async (req, res) => {
    try {
      const nuevoRol = await Rol.create(req.body);
      res.status(201).json(nuevoRol);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  // Obtener todos los roles
  exports.getRoles = async (req, res) => {
    try {
  //    const roles = await Rol.findAll();
  const roles = await sequelize.query(`InsertarRol 'nuevoRol'`)
      res.status(200).json(roles);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
    
  };
  
  // Obtener un rol por ID
  exports.getRolById = async (req, res) => {
    try {
      const rol = await Rol.findByPk(req.params.id);
      if (rol) {
        res.status(200).json(rol);
      } else {
        res.status(404).json({ message: 'Rol no encontrado' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  // Actualizar un rol por ID
  exports.updateRol = async (req, res) => {
    try {
      const rol = await Rol.findByPk(req.params.id);
      if (rol) {
        await rol.update(req.body);
        res.status(200).json(rol);
      } else {
        res.status(404).json({ message: 'Rol no encontrado' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };