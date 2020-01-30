import App from './app'

import * as bodyParser from 'body-parser'
import loggerMiddleware from './middlewares/logger'

import UsersController from './controllers/users.controller'
import { checkJwt } from './middlewares/cekjwt';

const app = new App({
    port: 1000,
    controllers: [
        new UsersController()
    ],
    middleWares: [
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
        loggerMiddleware,
        // checkJwt
    ],
});

app.listen();