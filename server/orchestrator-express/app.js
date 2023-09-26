import dotenv from 'dotenv';

if (process.env.NODE_ENV !== `production`) {
  dotenv.config();
}

import express, { json, urlencoded } from 'express';
import cors from 'cors';
import router from './routes/index.js';
import morgan from 'morgan';

const app = express();
const port = process.env.PORT || 4000;

app
.use(cors())
.use(urlencoded({ extended: true }))
.use(json())
.use(morgan('dev'))
.use('/api', router)

app.listen(port, () =>
  console.log(`Server Orchestrator Running Port: ${port}`)
);
