const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario  = require('../model/usuario');

const router = express.Router();
// Login de usuario
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {

    const user = await Usuario.findOne({ where: { USU_Correo_Electronico: email } });
    if (!user) return res.status(400).send('Email or password is wrong');

    const validPass = await bcrypt.compare(password, user.USU_Password);
  //  if (!validPass) return res.status(400).send('Invalid password'+ password +" comprar" +user.USU_Password );
  
    const token = jwt.sign({ id: user.USU_Usuario }, 'secret_key', { expiresIn: '24h' });
    res.header('Authorization', `Bearer ${token}`).send({ token });

    }catch (err) {
        res.status(500).send('Server error');
    }
});

module.exports = router;