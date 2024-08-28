const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Producto = require('./producto');
const Orden = require('./orden');

const OrdenDetalle = sequelize.define('NEG_ORDEN_DETALLE', {
    ORD_Orden_Detalle: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ORD_Cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    ORD_Precio: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    ORD_Subtotal: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    ORD_Orden: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Orden,
            key: 'ORD_Orden'
        }
    },
    PRO_Producto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Producto,
            key: 'PRO_Producto'
        }
    }
}, {
    tableName: 'NEG_ORDEN_DETALLE',
    timestamps: false
});

module.exports = OrdenDetalle;