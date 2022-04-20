import { Product, ProductStore } from '../models/product';
import express, { Request, Response } from 'express';

const productStore = new ProductStore();

const index = async (req: Request, res: Response) => {
  console.log('Request for products index');
  const products = await productStore.index();
  res.json(products);
};

const show = async (req: Request, res: Response) => {
  console.log('Request for products with id', req.params.id);
  const product = await productStore.show(req.params.id);
  res.json(product);
};

const create = async (req: Request, res: Response) => {
  console.log('Request to add product');
  try {
    const product: Product = {
      name: req.body.name,
      price: req.body.price,
    };
    const newProduct = await productStore.create(product);
    res.json(newProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const productRoutes = (app: express.Application) => {
  app.get('/products/', index);
  app.get('/products/:id', show);
  app.post('/products/', create);
};

export default productRoutes;
