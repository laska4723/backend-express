import express from 'express';

const server = express();

const port = 2000;

server.listen(port, () => {
  console.log(`Server is started on port ${port}...`);
});

server.get('/', (req, res) => {
  console.log('Пришел запрос с методом GET');
  res.send('Hello World!');
});

server.post('/', (req, res) => {
  console.log('Пришел запрос с методом POST');
  res.send('Hello World!');
});

server.put('/', (req, res) => {
  console.log('Пришел запрос с методом PUT');
  res.send('Hello World!');
});