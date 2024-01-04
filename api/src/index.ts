import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';

import { userRouter } from './routers/user.router';
import { shelterRouter } from './routers/shelter.router';
import { dogRouter } from './routers/dog.router';

const app = express();

import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT;
const mongoUri = process.env.MONGO_URI as string;
mongoose
  .connect(mongoUri, {})
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.log(err));

app.get('/', (_req, res) => {
  res.send('API Rest Info');
});

const corsOptions = {
  origin: '*',
};

app.set('trust proxy', true);

app.use((req, res, next) => {
  res.header('Content-Security-Policy', 'upgrade-insecure-requests;');
  next();
});

app.use(morgan('dev'));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static('public'));

app.use('/user', userRouter);
app.use('/shelter', shelterRouter);
app.use('/dog', dogRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
