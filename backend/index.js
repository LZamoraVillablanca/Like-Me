const express = require('express');
const cors = require('cors');
const {
  obtenerPosts,
  agregarPost,
  likearPost,
  eliminarPost,
} = require('./operaciones');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor encendido en puerto ${PORT}`));

app.get('/posts', obtenerPosts);

app.post('/posts', agregarPost);

app.put('/posts/like/:id', likearPost);

app.delete('/posts/:id', eliminarPost);




