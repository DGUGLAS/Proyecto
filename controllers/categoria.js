const CategoriaProducto = require("../model/categoria")
const sequelize = require ("../config/db")

// Crear una nueva categoría

exports.crearCategoria = async (req, res) => {
    try {
        const { CAT_Nombre, USU_Usuario, EST_Estado } = req.body;
        
        const CAT_Fecha_Creacion = new Date().toISOString().slice(0, 19).replace('T', ' ');

        // Ejecutar el procedimiento almacenado usando Sequelize
        const [result] = await sequelize.query(`
            EXEC InsertarCategoriaProducto 
                @CAT_Nombre = :CAT_Nombre, 
                @CAT_Fecha_Creacion = :CAT_Fecha_Creacion, 
                @USU_Usuario = :USU_Usuario, 
                @EST_Estado = :EST_Estado
        `, {
            replacements: {
                CAT_Nombre,
                CAT_Fecha_Creacion, // Asigna la fecha de creación a la fecha actual
                USU_Usuario,
                EST_Estado
            },
            type: sequelize.QueryTypes.INSERT
        });

        res.json({ message: 'Categoría creada exitosamente', result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Obtener todas las categorías

// Actualizar una categoría existente

exports.actualizarCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const { CAT_Nombre, USU_Usuario, EST_Estado } = req.body;

        // Ejecutar el procedimiento almacenado usando Sequelize
        const [result] = await sequelize.query(`
            EXEC ActualizarCategoriaProducto 
                @CAT_Categoria_Producto = :CAT_Categoria_Producto, 
                @CAT_Nombre = :CAT_Nombre, 
                @USU_Usuario = :USU_Usuario, 
                @EST_Estado = :EST_Estado
        `, {
            replacements: {
                CAT_Categoria_Producto: id,
                CAT_Nombre,
                USU_Usuario,
                EST_Estado
            },
            type: sequelize.QueryTypes.UPDATE
        });

        // Comprobamos si se realizó alguna actualización
        if (result) {
            res.json({ message: 'Categoría actualizada exitosamente' });
        } else {
            res.status(404).json({ error: 'Categoría no encontrada o no actualizada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
