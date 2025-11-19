import express from 'express';
import { registerUser, loginUser } from '../controllers/authController';
import { auth } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/protected', auth, (req, res) => {
  res.json({ message: 'Protected route' });
});

export default router;