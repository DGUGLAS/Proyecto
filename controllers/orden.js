const Orden = require("../model/orden")
const sequelize = require ("../config/db") 

exports.getOrders = async (req, res) => {
    try {
        const ordenes = await Orden.findAll();
        res.json(ordenes);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las órdenes' });
    }
};

exports.createOrder = async (req, res) => {
    const {
        ORD_Primer_Nombre, ORD_Segundo_Nombre, ORD_Primer_Apellido, 
        ORD_Direccion, ORD_Telefono, ORD_Correo_Electronico, 
        ORD_Fecha_Entrega, ORD_Total, USU_Usuario, EST_Estado, Detalles
    } = req.body;

    try {
        // Convertir los detalles a formato JSON
        const detallesJson = JSON.stringify(Detalles);

        // Ejecutar el procedimiento almacenado
        const result = await sequelize.query(
            `EXEC InsertarOrdenConDetalles 
            @ORD_Primer_Nombre = :ORD_Primer_Nombre,
            @ORD_Segundo_Nombre = :ORD_Segundo_Nombre,
            @ORD_Primer_Apellido = :ORD_Primer_Apellido,
            @ORD_Direccion = :ORD_Direccion,
            @ORD_Telefono = :ORD_Telefono,
            @ORD_Correo_Electronico = :ORD_Correo_Electronico,
            @ORD_Fecha_Entrega = :ORD_Fecha_Entrega,
            @ORD_Total = :ORD_Total,
            @USU_Usuario = :USU_Usuario,
            @EST_Estado = :EST_Estado,
            @Detalles = :Detalles`, // Parámetro JSON para los detalles de la orden
            {
                replacements: {
                    ORD_Primer_Nombre,
                    ORD_Segundo_Nombre,
                    ORD_Primer_Apellido,
                    ORD_Direccion,
                    ORD_Telefono,
                    ORD_Correo_Electronico,
                    ORD_Fecha_Entrega,
                    ORD_Total,
                    USU_Usuario,
                    EST_Estado,
                    Detalles: detallesJson
                },
                type: sequelize.QueryTypes.INSERT
            }
        );

        // Responder con éxito si la inserción fue correcta
        res.status(201).json({ message: 'Orden y detalles insertados correctamente', result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear la orden' });
    }
};

exports.updateOrder = async (req, res) => {
    const { ORD_Primer_Nombre, ORD_Segundo_Nombre, ORD_Primer_Apellido, ORD_Direccion, ORD_Telefono, ORD_Correo_Electronico, ORD_Fecha_Entrega, ORD_Total, USU_Usuario, EST_Estado, Detalles } = req.body;

    try {
        // Llamada al procedimiento almacenado para actualizar la orden
        const result = await sequelize.query(
            `DECLARE @IdResultado INT;
            DECLARE @Resultado NVARCHAR(255);

            EXEC ActualizarOrdenConDetalles 
                @ORD_Orden = :ORD_Orden,
                @ORD_Primer_Nombre = :ORD_Primer_Nombre,
                @ORD_Segundo_Nombre = :ORD_Segundo_Nombre,
                @ORD_Primer_Apellido = :ORD_Primer_Apellido,
                @ORD_Direccion = :ORD_Direccion,
                @ORD_Telefono = :ORD_Telefono,
                @ORD_Correo_Electronico = :ORD_Correo_Electronico,
                @ORD_Fecha_Entrega = :ORD_Fecha_Entrega,
                @ORD_Total = :ORD_Total,
                @USU_Usuario = :USU_Usuario,
                @EST_Estado = :EST_Estado,
                @Detalles = :Detalles,
                @IdResultado = @IdResultado OUTPUT,
                @Resultado = @Resultado OUTPUT;

            SELECT @IdResultado AS IdResultado, @Resultado AS Resultado;`,
            {
                replacements: {
                    ORD_Orden: req.params.id,
                    ORD_Primer_Nombre,
                    ORD_Segundo_Nombre,
                    ORD_Primer_Apellido,
                    ORD_Direccion,
                    ORD_Telefono,
                    ORD_Correo_Electronico,
                    ORD_Fecha_Entrega,
                    ORD_Total,
                    USU_Usuario,
                    EST_Estado,
                    Detalles: JSON.stringify(Detalles) // Convertir Detalles a cadena JSON si no lo es ya
                },
                type: sequelize.QueryTypes.SELECT
            }
        );

        const { IdResultado, Resultado } = result[0];

        if (IdResultado === 1) {
            res.status(200).json({ message: Resultado });
        } else {
            res.status(500).json({ error: Resultado });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la orden', details: error.message });
    }
};