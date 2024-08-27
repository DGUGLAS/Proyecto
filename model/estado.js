const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Estado = sequelize.define('NEG_ESTADO', {
    EST_Estado: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    EST_Nombre: {
      type: DataTypes.STRING(20),
      allowNull: false
    }
  }, {
    timestamps: false,
    tableName: 'NEG_ESTADO'
  });
  
  module.exports = Estado;