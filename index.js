const express = require("express");
let mysql = require('mysql2');
const app = express();
const PORT = 3000;
app.use(express.json);
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send('Hello World!');
})
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
})
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',       
    password: 'panggunggembira623',   
    database: 'biodata',
    port: 3306
})

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the database.');
});
app.get('/users', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
            console.error('Error fetching users:', err);
            req.status(500).send('Error fetching users');
            return;
        }
        res.json(results);
    })
});
app.post('/api/user', (req, res) => {
    const { nama, nim, kelas } = req.body;

    if (!nama || !nim || !kelas) {
        return res.status(400).json({ error: 'tolong isi nama, nim, dan kelas' });
    }

    db,query(
        'INSERT INTO users (nama, nim, kelas) VALUES (?, ?, ?)',
        [nama, nim, kelas],
        (err, results) => {
            if (err) {
                console.error('Error adding user:', err);
                return res.status(500).json({ error: 'Error adding user' });
            }
            res.status(201).json({ message: 'User added successfully'});
        }
    );
});
