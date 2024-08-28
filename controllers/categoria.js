const CategoriaProducto = require("../model/categoria")

// Crear una nueva categoría
exports.crearCategoria = async (req, res) => {
    try {
        const { CAT_Nombre, USU_Usuario, EST_Estado } = req.body;
        const nuevaCategoria = await CategoriaProducto.create({ CAT_Nombre, USU_Usuario, EST_Estado });
        res.json(nuevaCategoria);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Obtener todas las categorías
exports.obtenerCategorias = async (req, res) => {
    try {
        const categorias = await CategoriaProducto.findAll();
        res.json(categorias);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



// Actualizar una categoría existente
exports.actualizarCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const { CAT_Nombre, USU_Usuario, EST_Estado } = req.body;
        const categoria = await CategoriaProducto.findByPk(id);

        if (categoria) {
            categoria.CAT_Nombre = CAT_Nombre;
            categoria.USU_Usuario = USU_Usuario;
            categoria.EST_Estado = EST_Estado;
            await categoria.save();
            res.json(categoria);
        } else {
            res.status(404).json({ error: 'Categoría no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};