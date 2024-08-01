import express from 'express';
import path from 'path';

const app = express();

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

app.use(express.static(path.join(__dirname, '../public/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/dist/index.html'));
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
