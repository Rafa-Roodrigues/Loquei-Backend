import 'dotenv/config';
import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import '../typeorm/database';

import '../tsyringe';

import { routes } from './routes';
import { AppError } from '../../error/AppError';
import cors from 'cors';

const options: cors.CorsOptions = {
  origin: '*',
  methods: '*'
};

const app = express();

app.use(cors(options));
app.use(express.json());

app.use(routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message
    });
  }

  return res.status(500).json({
    status: 'error',
    message: `Internal server error - ${err.message}`
  });
});

app.listen(process.env.PORT || 8080);
