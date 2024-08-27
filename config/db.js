const { Sequelize } = require('sequelize');


/*const sequelize = new Sequelize('NEGOCIO', null, null, {
    dialect: 'mssql',
    dialectOptions: {
      authentication: {
        type: 'ntlm',
        options: {
          domain: 'localhost',
          userName: 'admin',
          password: 'admin',
        },
      },
      options: {
        instanceName: 'GIAN/SQLExpress',
      },
    },
  });*/

  const sequelize = new Sequelize('NEGOCIO', 'admin', 'admin', {
    dialect: 'mssql',
    host: 'localhost'
  });

module.exports = sequelize;