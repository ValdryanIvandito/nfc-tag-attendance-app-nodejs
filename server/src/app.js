// src/app.js
import express from 'express';
import router from './routes/index.js';
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // (opsional)
app.use('/api', router);

export default app;
