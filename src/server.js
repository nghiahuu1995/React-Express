const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { users, pool } = require('./db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
dotenv.config({ path: '../.env' });
const secretKey = process.env.JWT_SECRET;
const app = express();
app.use(express.json());
app.use(cors());
console.log('JWT Secret:', secretKey);
app.post('/auth/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
    users.query(sql, [username, hashedPassword], (err, result) => {
        if (err) {
            console.error('Error executing query', err);
            return res.status(500).send('Server error');
        }
        res.status(201).json({ message: 'User registered successfully' });
    });
});

app.post('/auth/login', (req, res) => {
    const { username, password } = req.body;
    const sql = 'SELECT * FROM users WHERE username = ?';
    users.query(sql, [username], async (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Server error' });
        }
        if (results.length === 0) {
            console.log('User not found');
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const user = results[0];
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            console.log('Passwords do not match');
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: '1h' });
        res.status(200).json({ token });
    });
});

app.get('/auth/protected/cars', async (req, res) => {
    const sql = "SELECT * FROM car WHERE deleted_flag = 0"
    pool.query(sql, async (err, results) => {
        if (err) {
            console.error('Error getting cars');
            return res.status(500).json({ message: 'Server error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'No cars in database' });
        }
        res.status(200).json(results);
    });
})
app.get('/auth/protected/cars/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM car WHERE id = ? AND deleted_flag = 0';

    pool.query(sql, [id], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).send('Server error');
        }
        if (results.length === 0) {
            return res.status(404).send('Record not found');
        }
        res.json(results[0]); // Return the first (and only) result
    });
});
app.post('/auth/protected/cars', (req, res) => {
    const { make, model, year } = req.body;
    const sql = `INSERT INTO car (make,model,year)VALUES (?,?,?)`;
    pool.query(sql, [make, model, year], async (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Server error' });
        }
        if (results.length === 0) {
            console.log('Car not found');
            return res.status(401).json({ error: 'No cars in database' });
        }
        res.status(201).json({ make, model, year });
    });
});

app.delete('/auth/protected/cars/:id', (req, res) => {
    const { id } = req.params;

    const deleteSql = 'UPDATE car set deleted_flag = 1 WHERE id = ?';
    pool.query(deleteSql, [id], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).send('Server error');
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('Car not found');
        }

        // Check if the table is empty
        const checkSql = 'SELECT COUNT(*) AS count FROM car';
        pool.query(checkSql, (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                return res.status(500).send('Server error');
            }
            if (results[0].count === 0) {
                // Reset auto-increment value if table is empty
                const resetSql = 'ALTER TABLE car AUTO_INCREMENT = 1';
                pool.query(resetSql, (err, results) => {
                    if (err) {
                        console.error('Error executing query:', err);
                        return res.status(500).send('Server error');
                    }
                    res.status(200).send('Car deleted successfully and auto-increment value reset');
                });
            } else {
                res.status(200).send('Car deleted successfully');
            }
        });
    });
});
app.put('/auth/protected/cars/:id', async (req, res) => {
    const { id } = req.params;
    const { make, model, year } = req.body;
    const sql = "UPDATE car SET make = ?, model = ?, year = ? WHERE id = ?"
    pool.query(sql, [make, model, year, id], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).send('Server error');
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('Car not found');
        }
        res.status(200).send('Car updated successfully');
    });
})
const port = process.env.BE_PORT || 8000;
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
});
