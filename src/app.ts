import * as express from 'express';
import { Application } from 'express';
import {createConnection} from "typeorm";


class App {
    public app: Application;
    public port: number;

    constructor(appInit: { port: number; middleWares: any; controllers: any; }) {
        this.app = express();
        this.port = appInit.port;
        this.connectToTheDatabase();
        this.middlewares(appInit.middleWares);
        this.routes(appInit.controllers);
    }

    private connectToTheDatabase() {
       createConnection().then(
           connect => console.log('connected'),
           err => console.log('error to connect')
       )
      }

    private middlewares(middleWares: { forEach: (arg0: (middleWare: any) => void) => void; }) {
        middleWares.forEach(middleWare => {
            this.app.use(middleWare);
        });
    }

    private routes(controllers: { forEach: (arg0: (controller: any) => void) => void; }) {
        controllers.forEach(controller => {
            this.app.use('/api/v1', controller.router);
        });
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the http://localhost:${this.port}`);
        });
    }
}

export default App