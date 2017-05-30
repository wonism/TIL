import Express from 'express';
import path from 'path';

const app = new Express();

app.use(Express.static('public'));
app.get('/', (req, res) => res.sendFile(path.resolve('public', 'index.html')));

app.listen(3030, () => {
  console.log('Listen 3030');
});

