import * as express from 'express';
import IControllerBase from '../interfaces/IControllerBase.interface';
declare class UsersController implements IControllerBase {
    path: string;
    router: import("express-serve-static-core").Router;
    constructor();
    initRoutes(): void;
    login: (req: express.Request<import("express-serve-static-core").ParamsDictionary>, res: express.Response) => Promise<void>;
    users: (req: express.Request<import("express-serve-static-core").ParamsDictionary>, res: express.Response) => Promise<void>;
    insertUser: (req: express.Request<import("express-serve-static-core").ParamsDictionary>, res: express.Response) => Promise<void>;
    updateUser: (req: express.Request<import("express-serve-static-core").ParamsDictionary>, res: express.Response) => Promise<void>;
    deleteUser: (req: express.Request<import("express-serve-static-core").ParamsDictionary>, res: express.Response) => Promise<void>;
}
export default UsersController;
