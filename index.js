const  express = require('express')
const db = require('./src/config/database.js')

const app = express()
const port = 4000
app.listen(port,(req, res)=>{
    console.log(`terkoneksi ke port ${port}`)
})

app.use(express.json());

// Endpoint untuk mendapatkan semua data
app.get('/api/data', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Endpoint untuk mendapatkan data berdasarkan ID
app.get('/api/data/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.status(404).json({ message: 'Data not found' });
    }
  });
});

// Endpoint untuk menambah data
app.post('/api/data', (req, res) => {
  const newData = req.body;
  db.query('INSERT INTO users SET ?', newData, (err, results) => {
    if (err) throw err;
    res.status(201).json({ id: results.insertId, ...newData });
  });
});

// Endpoint untuk memperbarui data
app.put('/api/data/:id', (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  db.query('UPDATE users SET ? WHERE id = ?', [updatedData, id], (err, results) => {
    if (err) throw err;
    if (results.affectedRows > 0) {
      res.json({ id, ...updatedData });
    } else {
      res.status(404).json({ message: 'Data not found' });
    }
  });
});

// Endpoint untuk menghapus data
app.delete('/api/data/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM users WHERE id = ?', [id], (err, results) => {
    if (err) throw err;
    if (results.affectedRows > 0) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Data not found' });
    }
  });
});

