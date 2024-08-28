const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Producto = sequelize.define('NEG_PRODUCTO', {
    PRO_Producto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    PRO_Nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    PRO_Marca: {
        type: DataTypes.STRING,
        allowNull: false
    },
    PRO_Codigo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    PRO_Stock: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    PRO_Precio: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    PRO_Fecha_Creacion: {
        type: DataTypes.DATE,
        allowNull: false
    },
    PRO_FOTO: {
        type: DataTypes.BLOB,
        allowNull: true, // Ahora acepta valores nulos
        defaultValue: null // Puedes establecer un valor predeterminado nulo si lo deseas
    },
    CAT_Categoria_Producto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'NEG_CATEGORIA_PRODUCTO',
            key: 'CAT_Categoria_Producto'
        }
    },
    USU_Usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'NEG_USUARIO',
            key: 'USU_Usuario'
        }
    },
    EST_Estado: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'NEG_ESTADO',
            key: 'EST_Estado'
        }
    }
}, {
    tableName: 'NEG_PRODUCTO',
    timestamps: false
});

module.exports = Producto;