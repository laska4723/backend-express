import express, { Request, Response } from 'express';
import { logger } from './logger';

const app = express();
const port = 2000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  logger.info('GET request received');
  res.send('Hello World! GET');
});

app.post('/', (req: Request, res: Response) => {
  logger.info('POST request received');
  res.send('Hello World! POST');
});

app.put('/', (req: Request, res: Response) => {
  logger.info('PUT request received');
  res.send('Hello World! PUT');
});

app.delete('/', (req: Request, res: Response) => {
  logger.info('DELETE request received');
  res.send('Hello World! DELETE');
});

app.listen(port, () => {
  logger.info(`Server started on port ${port}`);
});
