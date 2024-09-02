const jwt = require('jsonwebtoken');
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('NEGOCIO', 'admin', 'admin', {
    host: 'localhost',
    dialect: 'mssql', // Ajusta según tu base de datos
});

// Función para obtener el rol del usuario desde la base de datos
async function getUserRole(userId) {
    try {
        const [results] = await sequelize.query(
            `EXEC ObtenerRolDeUsuario :userId`,
            {
                replacements: { userId: userId },
                type: Sequelize.QueryTypes.SELECT
            }
        );
        console.log(results)
        // Verificar que los resultados son correctos
        if (!results || results.length === 0) {
            throw new Error('No role found for the user');
        }
        const result = results.ROL_Rol;

        console.log(result)

        
            
        return result;
    } catch (error) {
        console.error('Database query error:', error);
        throw error;
    }
}

// Middleware para autenticar y autorizar basado en rol
function authenticateAndAuthorize(requiredRole) {
    return async (req, res, next) => {
        try {
            // Obtener el token del encabezado de autorización
            const token = req.header('Authorization')?.split(' ')[1];
            if (!token) return res.status(401).send('Access Denied');

            // Verificar el token JWT
            jwt.verify(token, 'secret_key', async (err, decoded) => {
                if (err) return res.status(403).send('Invalid Token');

                // Obtener el rol del usuario desde la base de datos
                const userRole = await getUserRole(decoded.id);
                console.log(userRole)
                console.log(requiredRole)
                // Verificar si el rol del usuario coincide con el rol requerido
                if (userRole !== requiredRole) {
                    return res.status(403).send('Access Denied: Insufficient permissions');
                }

                req.user = decoded; // Puedes incluir más datos si es necesario
                next();
            });
        } catch (err) {
            res.status(500).send('Server error');
        }
    };
}


module.exports = authenticateAndAuthorize;
