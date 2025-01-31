import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../db.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log(username);
  const getUser = db.prepare('SELECT * FROM users WHERE username = ?');
  const result = getUser.get(username);
  console.log(result);
  const isCorrectPassword = await bcrypt.compare(password, result.password);
  console.log({ isCorrectPassword });
  res.json({ message: '' });
  try {
  } catch (error) {}
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
