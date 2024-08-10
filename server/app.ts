import express from 'express';
import path from 'path';
import loadRoutes from './lib/loadRoutes';

const app = express();

void loadRoutes(app);

app.use(express.static(path.join(__dirname, '../public')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/index.html'));
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
