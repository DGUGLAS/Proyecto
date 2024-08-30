const Estado = require("../model/estado")

exports.createEstado = async (req, res) => {
    try {
      const estado = await Estado.create(req.body);
      res.status(201).json(estado);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  exports.getEstados = async (req, res) => {
    try {
      const estados = await Estado.findAll();
      res.status(200).json(estados);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  exports.getEstadoById = async (req, res) => {
    try {
      const estado = await Estado.findByPk(req.params.id);
      if (estado) {
        res.status(200).json(estado);
      } else {
        res.status(404).json({ message: 'Estado no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  exports.updateEstado = async (req, res) => {
    try {
      const estado = await Estado.update(req.body, {
        where: { EST_Estado: req.params.id }
      });
      res.status(200).json(estado);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };