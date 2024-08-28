const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const CategoriaProducto = sequelize.define('NEG_CATEGORIA_PRODUCTO', {
    CAT_Categoria_Producto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    CAT_Nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    CAT_Fecha_Creacion: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    USU_Usuario: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    EST_Estado: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'NEG_CATEGORIA_PRODUCTO',
    timestamps: false
});

module.exports = CategoriaProducto;