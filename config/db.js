const { Sequelize } = require('sequelize');

  const sequelize = new Sequelize('NEGOCIO', 'admin', 'admin', {
    dialect: 'mssql',
    host: 'localhost'
  });

module.exports = sequelize;