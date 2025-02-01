import express, { Router } from 'express';
import db from '../db.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', (req, res) => {
  console.log(req.userId);
  try {
    const getTodos = db.prepare('SELECT * FROM todos WHERE user_id = ?');
    const todos = getTodos.all(req.userId);
    console.log({ todos });
    res.json(todos);
  } catch (error) {}
});
router.post('/', (req, res) => {
  const { task } = req.body;
  try {
    const insertTodo = db.prepare(
      'INSERT INTO todos(user_id,task) VALUES(?,?)'
    );
    const result = insertTodo.run(req.userId, task);
    res.json({ id: result.lastInsertRowid, task, completed: 0 });
  } catch (error) {}
});
router.put('/:id', (req, res) => {
  const { completed } = req.body;
  const { id } = req.params;
  const updateTodo = db.prepare('UPDATE todos SET completed = ? WHERE id=?');
  updateTodo.run(completed, id);
  res.json({ message: 'Todo Completed' });
});
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const deleteTodo = db.prepare('DELETE FROM todos WHERE id= ? AND user_id= ?');
  deleteTodo.run(id, req.userId);
  res.json({ message: 'Todo Deleted' });
});

export default router;
