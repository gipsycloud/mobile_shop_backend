import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from your TypeScript Node.js backend!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}); for (let i = 0; i < 5; i++) {
  console.log('Hello world!');
}
