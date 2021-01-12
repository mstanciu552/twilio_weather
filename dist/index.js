"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const axios_1 = __importDefault(require("axios"));
const sendMessage_js_1 = require("./sendMessage.js");
const app = express_1.default();
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
dotenv_1.default.config();
app.post('/', (req, _) => {
    const message = req.body.Body;
    const from = req.body.From;
    const to = req.body.To;
    const messageArray = message.split(' ');
    if (messageArray[0] === 'weather') {
        axios_1.default
            .get(`http://api.openweathermap.org/data/2.5/weather?q=${messageArray[1]}&appid=${process.env.WEATHER_API_KEY}`)
            .then(res => {
            sendMessage_js_1.sendMessage(res.data.weather[0].main, res.data.weather[0].description, res.data.main, res.data.main.temp, from, to);
        })
            .catch(err => {
            if (err && err.response.data) {
                sendMessage_js_1.sendError(err.response.data.message, from, to);
            }
        });
    }
});
app.listen(process.env.PORT || 4000, () => console.log(`Server listening on port ${process.env.PORT || 4000}`));
//# sourceMappingURL=index.js.map