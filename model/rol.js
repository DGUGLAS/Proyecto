const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Rol = sequelize.define('NEG_ROL', {
    ROL_Rol: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    ROL_Nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'NEG_ROL',
    timestamps: false,
  });
  

module.exports = Rol