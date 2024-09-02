const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario  = require('../model/usuario');

const router = express.Router();

// Registro de usuario
router.post('/register', async (req, res) => {
    const { USU_Correo_Electronico, USU_Primer_Nombre, USU_Segundo_Nombre, USU_Primer_Apellido, USU_Password, USU_Telefono, USU_Fecha_Nacimiento, USU_Fecha_Creacion, ROL_Rol, EST_Estado } = req.body;


    const hashedPassword = await bcrypt.hash(USU_Password, 10);
    console.log(hashedPassword)
    const user = new Usuario({
        USU_Correo_Electronico: USU_Correo_Electronico,
        USU_Primer_Nombre: USU_Primer_Nombre,
        USU_Segundo_Nombre: USU_Segundo_Nombre,
        USU_Primer_Apellido: USU_Primer_Apellido,
        USU_Password: hashedPassword,
        USU_Telefono: USU_Telefono,
        USU_Fecha_Nacimiento: USU_Fecha_Nacimiento,
        USU_Fecha_Creacion: USU_Fecha_Creacion,
        ROL_Rol: ROL_Rol,   // Asegúrate de que el rol exista en la tabla NEG_ROL
        EST_Estado: EST_Estado
        // Rellenar el resto de los campos necesarios
    });

    try {
        const savedUser = await user.save();
        res.send({ user: savedUser });
    } catch (err) {
        res.status(400).send(err);
    }
});

// Login de usuario
router.post('/login', async (req, res) => {
    

    try {
        
        const { email, password } = req.body;    

    const user = await Usuario.findOne({ where: { USU_Correo_Electronico: email } });
    if (!user) {
        return res.status(400).send('Email o contraeña estan mal');
    }
    console.log('Contraseña ingresada:', password);
    console.log('Contraseña en base de datos (hash):', user.USU_Password);

    const validPass = await bcrypt.compare(password,user.USU_Password);
    console.log('¿Contraseña válida?:', validPass);
 /* if (!validPass){
    return res.status(400).send('Contraseña invalida' );
  } */
    const token = jwt.sign({ id: user.USU_Usuario }, 'secret_key', { expiresIn: '24h' });
    res.header('Authorization', `Bearer ${token}`).send({ token });

    }catch (err) {
        res.status(500).send('Server error' );
        console.error('Error contraseña:', err);
    }
});

module.exports = router;