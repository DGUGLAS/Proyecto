const Producto = require('../model/producto');
const sequelize = require ("../config/db") 
// Crear un nuevo producto
exports.createProducto = async (req, res) => {
    try {
        const {
            PRO_Nombre, PRO_Marca, PRO_Codigo, PRO_Stock,
            PRO_Precio, PRO_Fecha_Creacion, PRO_FOTO,
            CAT_Categoria_Producto, USU_Usuario, EST_Estado
        } = req.body;

        // Ejecutar el procedimiento almacenado usando Sequelize
        await sequelize.query(`
            EXEC InsertarProducto
                @PRO_Nombre = :PRO_Nombre,
                @PRO_Marca = :PRO_Marca,
                @PRO_Codigo = :PRO_Codigo,
                @PRO_Stock = :PRO_Stock,
                @PRO_Precio = :PRO_Precio,
                @PRO_Fecha_Creacion = :PRO_Fecha_Creacion,
                @PRO_FOTO = :PRO_FOTO,
                @CAT_Categoria_Producto = :CAT_Categoria_Producto,
                @USU_Usuario = :USU_Usuario,
                @EST_Estado = :EST_Estado
        `, {
            replacements: {
                PRO_Nombre,
                PRO_Marca,
                PRO_Codigo,
                PRO_Stock,
                PRO_Precio,
                PRO_Fecha_Creacion,
                PRO_FOTO,
                CAT_Categoria_Producto,
                USU_Usuario,
                EST_Estado
            },
            type: sequelize.QueryTypes.INSERT
        });

        res.status(201).json({ message: 'Producto creado exitosamente' });
    } catch (error) {
        console.error('Error al crear el producto:', error);
        res.status(500).json({
            error: 'Error al crear el producto',
            details: error.message
        });
    }
};
// Obtener todos los productos
exports.getProductos = async (req, res) => {
    try {
        const productos = await Producto.findAll();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
};

// Obtener un producto por ID
exports.getProductoById = async (req, res) => {
    try {
        const producto = await Producto.findByPk(req.params.id);
        if (producto) {
            res.json(producto);
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
};

// Actualizar un producto existente
exports.updateProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            PRO_Nombre, PRO_Marca, PRO_Codigo, PRO_Stock,
            PRO_Precio, PRO_FOTO, CAT_Categoria_Producto,
            USU_Usuario, EST_Estado
        } = req.body;

        // Verificar si el producto existe antes de actualizar
        const [producto] = await sequelize.query(`
            SELECT * FROM NEG_PRODUCTO WHERE PRO_Producto = :id
        `, {
            replacements: { id },
            type: sequelize.QueryTypes.SELECT
        });

        if (producto) {
            // Ejecutar el procedimiento almacenado usando Sequelize
            await sequelize.query(`
                EXEC ActualizarProducto
                    @PRO_Producto = :id,
                    @PRO_Nombre = :PRO_Nombre,
                    @PRO_Marca = :PRO_Marca,
                    @PRO_Codigo = :PRO_Codigo,
                    @PRO_Stock = :PRO_Stock,
                    @PRO_Precio = :PRO_Precio,
                    @PRO_FOTO = :PRO_FOTO,
                    @CAT_Categoria_Producto = :CAT_Categoria_Producto,
                    @USU_Usuario = :USU_Usuario,
                    @EST_Estado = :EST_Estado
            `, {
                replacements: {
                    id,
                    PRO_Nombre,
                    PRO_Marca,
                    PRO_Codigo,
                    PRO_Stock,
                    PRO_Precio,
                    PRO_FOTO,
                    CAT_Categoria_Producto,
                    USU_Usuario,
                    EST_Estado
                },
                type: sequelize.QueryTypes.RAW
            });

            res.status(200).json({ message: 'Producto actualizado exitosamente' });
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        res.status(500).json({
            error: 'Error al actualizar el producto',
            details: error.message
        });
    }
};
