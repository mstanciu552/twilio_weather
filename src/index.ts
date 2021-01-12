import dotenv from 'dotenv';
import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import { sendError, sendMessage } from './sendMessage.js';

const app: Application = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

dotenv.config();

app.post('/', (req: Request, _: Response) => {
  const message = req.body.Body;
  const from = req.body.From;
  const to = req.body.To;

  const messageArray: Array<string> = message.split(' ');

  if (messageArray[0] === 'weather') {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${messageArray[1]}&appid=${process.env.WEATHER_API_KEY}`
      )
      .then(res => {
        sendMessage(
          res.data.weather[0].main,
          res.data.weather[0].description,
          res.data.main,
          res.data.main.temp,
          from,
          to
        );
      })
      .catch(err => {
        if (err && err.response.data) {
          sendError(err.response.data.message, from, to);
        }
      });
  }
});

app.listen(process.env.PORT || 4000, () =>
  console.log(`Server listening on port ${process.env.PORT || 4000}`)
);
