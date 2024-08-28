const OrdenDetalle = require('../model/ordenDetalle');

// Obtener detalles de una orden
exports.getDetalles = async (req, res) => {
    try {
        const detalles = await OrdenDetalle.findAll({ where: { ORD_Orden: req.params.ordenId } });
        res.json(detalles);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los detalles de la orden' });
    }
};

// Crear un nuevo detalle de orden
exports.createDetalle = async (req, res) => {
    try {
        const detalle = await OrdenDetalle.create(req.body);
        res.status(201).json(detalle);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el detalle de la orden' });
    }
};

// Actualizar un detalle de orden existente
exports.updateDetalle = async (req, res) => {
    try {
        const detalle = await OrdenDetalle.findByPk(req.params.id);
        if (detalle) {
            await detalle.update(req.body);
            res.json(detalle);
        } else {
            res.status(404).json({ error: 'Detalle de orden no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el detalle de la orden' });
    }
};