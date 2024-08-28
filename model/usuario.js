const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const bcrypt = require('bcryptjs');

const Usuario = sequelize.define('NEG_USUARIO', {
    USU_Usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    USU_Correo_Electronico: {
        type: DataTypes.STRING,
        allowNull: false
    },
    USU_Primer_Nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    USU_Segundo_Nombre: {
        type: DataTypes.STRING,
        allowNull: true
    },
    USU_Primer_Apellido: {
        type: DataTypes.STRING,
        allowNull: false
    },
    USU_Password: {
        type: DataTypes.STRING,  // La longitud se incrementa debido al hash
        allowNull: false
    },
    USU_Telefono: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    USU_Fecha_Nacimiento: {
        type: DataTypes.DATE,
        allowNull: false
    },
    USU_Fecha_Creacion: {
        type: DataTypes.DATE,
        allowNull: false
    },
    ROL_Rol: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'NEG_ROL',
            key: 'ROL_Rol'
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
    tableName: 'NEG_USUARIO',
    timestamps: false,
    hooks: {
        beforeCreate: async (usuario) => {
            if (usuario.USU_Password) {
                const salt = await bcrypt.genSalt(10);
                usuario.USU_Password = await bcrypt.hash(usuario.USU_Password, salt);
            }
        },
        beforeUpdate: async (usuario) => {
            if (usuario.USU_Password) {
                const salt = await bcrypt.genSalt(10);
                usuario.USU_Password = await bcrypt.hash(usuario.USU_Password, salt);
            }
        }
    }
});

module.exports = Usuario;