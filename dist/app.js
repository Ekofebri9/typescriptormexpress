"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const typeorm_1 = require("typeorm");
class App {
    constructor(appInit) {
        this.app = express();
        this.port = appInit.port;
        this.connectToTheDatabase();
        this.middlewares(appInit.middleWares);
        this.routes(appInit.controllers);
    }
    connectToTheDatabase() {
        typeorm_1.createConnection().then(connect => console.log('connected'), err => console.log('error to connect'));
    }
    middlewares(middleWares) {
        middleWares.forEach(middleWare => {
            this.app.use(middleWare);
        });
    }
    routes(controllers) {
        controllers.forEach(controller => {
            this.app.use('/api/v1', controller.router);
        });
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the http://localhost:${this.port}`);
        });
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map