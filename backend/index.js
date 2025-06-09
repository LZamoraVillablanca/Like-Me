const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor encendido en puerto ${PORT}`));

app.get('/posts', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM posts');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener posts');
  }
});

app.post('/posts', async (req, res) => {
  try {
    const { titulo, url, descripcion, likes } = req.body;
    const consulta = 'INSERT INTO posts VALUES (DEFAULT, $1, $2, $3, $4)';
    const values = [titulo, url, descripcion, likes];
    await pool.query(consulta, values);
    res.send('Post agregado con éxito');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al agregar post');
  }
});

