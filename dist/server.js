"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const bodyParser = require("body-parser");
const logger_1 = require("./middlewares/logger");
const users_controller_1 = require("./controllers/users.controller");
const app = new app_1.default({
    port: 1000,
    controllers: [
        new users_controller_1.default()
    ],
    middleWares: [
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
        logger_1.default,
    ],
});
app.listen();
//# sourceMappingURL=server.js.map