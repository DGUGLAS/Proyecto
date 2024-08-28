const Orden = require("../model/orden")

exports.getOrders = async (req, res) => {
    try {
        const ordenes = await Orden.findAll();
        res.json(ordenes);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las órdenes' });
    }
};

exports.createOrder = async (req, res) => {
    try {
        const orden = await Orden.create(req.body);
        res.status(201).json(orden);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la orden' });
    }
};

exports.updateOrder = async (req, res) => {
    try {
        const orden = await Orden.findByPk(req.params.id);
        if (orden) {
            await orden.update(req.body);
            res.json(orden);
        } else {
            res.status(404).json({ error: 'Orden no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la orden' });
    }
};