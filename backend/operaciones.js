const pool = require('./db');

const obtenerPosts = async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM posts ORDER BY id DESC');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener posts:', error);
    res.status(500).json({ error: 'Error al obtener posts' });
  }
};

const agregarPost = async (req, res) => {
  try {
    const { titulo, img, url, descripcion } = req.body;
    const imagen = img || url;

    const query = 'INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, 0) RETURNING *';
    const values = [titulo, imagen, descripcion];

    const { rows } = await pool.query(query, values);
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error('Error al agregar post:', error);
    res.status(500).json({ error: 'Error al agregar post' });
  }
};

const likearPost = async (req, res) => {
  try {
    const { id } = req.params;
    const query = 'UPDATE posts SET likes = likes + 1 WHERE id = $1 RETURNING *';
    const values = [id];
    const { rows } = await pool.query(query, values);
    res.json(rows[0]);
  } catch (error) {
    console.error('Error al likear post:', error);
    res.status(500).json({ error: 'Error al likear post' });
  }
};


const eliminarPost = async (req, res) => {
  try {
    const { id } = req.params;
    const query = 'DELETE FROM posts WHERE id = $1 RETURNING *';
    const values = [id];
    const { rows } = await pool.query(query, values);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }

    res.json({ mensaje: 'Post eliminado exitosamente', post: rows[0] });
  } catch (error) {
    console.error('Error al eliminar post:', error);
    res.status(500).json({ error: 'Error al eliminar post' });
  }
};

module.exports = {
  obtenerPosts,
  agregarPost,
  likearPost,
  eliminarPost,
};
