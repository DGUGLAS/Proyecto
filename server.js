const express = require ('express');
const bodyParser = require('body-parser');
const usuarioRoutes = require('./routes/usuario');
const categoriaProductoRoutes = require('./routes/categoria');
const estadoRoutes = require('./routes/estado')
const productoRoutes = require('./routes/producto');
const rolRoutes = require('./routes/rol');
const sequelize = require ('./config/db');

const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(express.json());

app.get('/', (req, res)=> {
    res.send("hello word")
}) 

// Middleware para parsear JSON en el cuerpo de las solicitudes


// Middleware para manejar rutas
app.use('/api', usuarioRoutes);
app.use('/api', categoriaProductoRoutes);
app.use('/api', estadoRoutes);
app.use('/api', productoRoutes);
app.use('/api', rolRoutes);
//app.use('/api', estadoRoutes);

//app.use('/api/productos', productosRoutes);
// Usa otras rutas

app.get('/db-test', (req, res) => {
    try {
      sequelize.authenticate();
      console.log('authenticado')
     res.send('db-test connection')
    } catch (error) {
      console.log('no authenticado')
      
    }
  })
  
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal!');
  });
  
  app.use((req, res) => {
    res.status(404).send('Ruta no encontrada');
  });

app.listen(port, () => {
console.log(`example app listening on port ${port}`)
})
