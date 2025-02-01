import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../db.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const getUser = db.prepare('SELECT * FROM users WHERE username = ?');
    const user = getUser.get(username);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid)
      return res.status(401).send({ message: 'Invalid Credentials' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });
    res.json({ token });
  } catch (error) {
    res.sendStatus(503);
  }
});

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);

  try {
    const insertUser = db.prepare(
      'INSERT INTO users(username,password) VALUES (?,?)'
    );
    const result = insertUser.run(username, hashedPassword);

    const defaultTodo = `Hello! Add your firts todo!`;
    const insertTodo = db.prepare(
      'INSERT INTO todos(user_id,task) VALUES (?,?)'
    );
    insertTodo.run(result.lastInsertRowid, defaultTodo);
    // create token
    const token = jwt.sign(
      { id: result.lastInsertRowid },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    res.json({ token });
  } catch (error) {
    console.log(error.message);
    res.sendStatus(503);
  }
});

export default router;
