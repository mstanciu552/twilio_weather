"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendError = exports.sendMessage = void 0;
const twilio_1 = __importDefault(require("twilio"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const client = twilio_1.default(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const sendMessage = (main, description, city, temp, from, to) => {
    const messageReturned = `Current weather in ${city}: ${main}(${description})\n\nTemperature is ${parseFloat((temp - 272.15).toString()).toFixed(1)} degrees Celsius`;
    client.messages.create({
        to: from,
        from: to,
        body: messageReturned,
    });
};
exports.sendMessage = sendMessage;
const sendError = (err, from, to) => {
    client.messages.create({
        from: to,
        to: from,
        body: err + '. Please try again',
    });
};
exports.sendError = sendError;
//# sourceMappingURL=sendMessage.js.map