const { Result } = require("tedious/lib/token/helpers");
const sequelize = require ("../config/db") // Asegúrate de que esta línea esté en tu archivo de controlador

// Crear un nuevo estado utilizando un procedimiento almacenado
exports.createEstado = async (req, res) => {
    try {
        const { EST_Nombre } = req.body;

        // Ejecutar el procedimiento almacenado usando Sequelize
        const result = await sequelize.query(`
            EXEC InsertarEstado @EST_Nombre = :EST_Nombre
        `, {
            replacements: { EST_Nombre },
            type: sequelize.QueryTypes.INSERT
        });

        res.json({ message: 'Estado creada exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

 
  

  
exports.updateEstado = async (req, res) => {
  try {
      const { id } = req.params;
      const { EST_Nombre } = req.body;

      // Ejecutar el procedimiento almacenado usando Sequelize
      await sequelize.query(`
          EXEC ActualizarEstado @EST_Estado = :EST_Estado, @EST_Nombre = :EST_Nombre
      `, {
          replacements: { EST_Estado: id, EST_Nombre },
          type: sequelize.QueryTypes.UPDATE
      });

      res.status(200).json({ message: 'Estado actualizado exitosamente' });
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
};

  