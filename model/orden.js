const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Usuario = require('./usuario');
const Estado = require('./estado');

const Orden = sequelize.define('NEG_ORDEN', {
    ORD_Orden: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ORD_Creacion_Tiempo: {
        type: DataTypes.DATE,
        allowNull: false
    },
    ORD_Primer_Nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ORD_Segundo_Nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ORD_Primer_Apellido: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ORD_Direccion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ORD_Telefono: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    ORD_Correo_Electronico: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ORD_Fecha_Entrega: {
        type: DataTypes.DATE,
        allowNull: false
    },
    ORD_Total: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    USU_Usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuario,
            key: 'USU_Usuario'
        }
    },
    EST_Estado: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Estado,
            key: 'EST_Estado'
        }
    }
}, {
    tableName: 'NEG_ORDEN',
    timestamps: false
});

module.exports = Orden;