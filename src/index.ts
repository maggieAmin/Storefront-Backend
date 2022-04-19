import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { ProductStore } from './models/product';

const app: express.Application = express();
const address = '0.0.0.0:3000';

app.use(bodyParser.json());

app.get('/products/', async function (req: Request, res: Response) {
  const productStore = new ProductStore();
  const products = await productStore.index();
  res.send(JSON.stringify(products));
});

app.post('/users/XXX', function (req: Request, res: Response) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});

(async () => {
  const products = await new ProductStore().index();
  console.log('Here');
  console.log(products);
})();
