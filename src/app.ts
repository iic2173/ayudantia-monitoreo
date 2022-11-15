import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { Pool } from "pg";
import newrelic from "newrelic";


const app = express();
dotenv.config(); //Reads .env file and makes it accessible via process.env

const pool = new Pool({
  host: 'db',
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || "5432")
});

const connectToDB = async () => {
  try {
    console.log('Conectado a la DB de postgres')
    await pool.connect();
  } catch (err) {
    console.log(err);
  }
};

connectToDB();

app.get("", (req: Request, res: Response, next: NextFunction) => {
  res.send("Hello World");
});

app.get("/ping", (req: Request, res: Response, next: NextFunction) => {
  newrelic.incrementMetric('Ping/NumberOfCalls', 1);
  res.send("Pong");
});

app.get("/error", (req: Request, res: Response, next: NextFunction) => {
  throw new Error('Error! Sorry about that :(')
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running at ${process.env.PORT}`);
});
