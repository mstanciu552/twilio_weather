import twilio, { Twilio } from 'twilio';
import dotenv from 'dotenv';

dotenv.config();

const client: Twilio = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export const sendMessage = (
  main: string,
  description: string,
  city: string,
  temp: number,
  from: string,
  to: string
): void => {
  const messageReturned: string = `Current weather in ${city}: ${main}(${description})\n\nTemperature is ${parseFloat(
    (temp - 272.15).toString()
  ).toFixed(1)} degrees Celsius`;
  client.messages.create({
    to: from,
    from: to,
    body: messageReturned,
  });
};

export const sendError = (err: string, from: string, to: string): void => {
  client.messages.create({
    from: to,
    to: from,
    body: err + '. Please try again',
  });
};
