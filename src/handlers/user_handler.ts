import express, { Request, Response } from 'express';
import { User, UserStore } from '../models/user';
import { generateToken, verifyToken } from '../helpers/jwt-helper';

const userStore = new UserStore();

const index = async (req: Request, res: Response) => {
  console.log('Request for users index');
  if (!verifyToken(req.body.token)) {
    res.status(401);
    res.json('JWT Token missing');
    return;
  }
  const users = await userStore.index();
  res.json(users);
};

const show = async (req: Request, res: Response) => {
  console.log('Request for users with id', req.params.id);
  if (!verifyToken(req.body.token)) {
    res.status(401);
    res.json('JWT Token missing');
    return;
  }
  const user = await userStore.show(req.params.id);
  res.json(user);
};

const create = async (req: Request, res: Response) => {
  console.log('Request to add user');
  if (!verifyToken(req.body.token)) {
    res.status(401);
    res.json('JWT Token missing');
    return;
  }
  try {
    const user: User = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: req.body.password,
    };
    const newUser = await userStore.create(user);
    res.json(newUser);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const authenticate = async (req: Request, res: Response) => {
  console.log('Request to login user');
  try {
    const login = await userStore.authenticate(req.body.id, req.body.password);
    if (login) {
      // generate JWT token
      const token = generateToken('' + login.id);
      res.json({
        user_id: login.id,
        firstname: login.firstname,
        lastname: login.lastname,
        token: token,
      });
    } else {
      res.status(401);
      res.json('Invalid credentials');
    }
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const userRoutes = (app: express.Application) => {
  app.get('/users/', index);
  app.get('/users/:id', show);
  app.post('/users/', create);
  app.post('/users/login', authenticate);
};

export default userRoutes;
