import express, { Request, Response } from 'express';
import { User, UserStore } from '../models/user';

const userStore = new UserStore();

const index = async (req: Request, res: Response) => {
  console.log('Request for users index');
  const users = await userStore.index();
  res.json(users);
};

const show = async (req: Request, res: Response) => {
  console.log('Request for users with id', req.params.id);
  const user = await userStore.show(req.params.id);
  res.json(user);
};

const create = async (req: Request, res: Response) => {
  console.log('Request to add user');
  try {
    const user: User = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: userPasswordHash(req.body.password),
    };
    const newUser = await userStore.create(user);
    res.json(newUser);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const userPasswordHash = (password: string) => {
  // TODO
  return password;
};

const userRoutes = (app: express.Application) => {
  app.get('/users/', index);
  app.get('/users/:id', show);
  app.post('/users/', create);
};

export default userRoutes;
