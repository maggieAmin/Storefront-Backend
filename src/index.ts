import express from 'express';
import bodyParser from 'body-parser';
import productRoutes from './handlers/product_handler';
import userRoutes from './handlers/user_handler';
import orderRoutes from './handlers/order_handler';

const app: express.Application = express();
const address = '0.0.0.0:3000';

app.use(bodyParser.json());

productRoutes(app);
userRoutes(app);
orderRoutes(app);

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});
