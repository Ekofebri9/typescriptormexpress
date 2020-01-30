import { Request, Response } from 'express';
declare const loggerMiddleware: (req: Request<import("express-serve-static-core").ParamsDictionary>, resp: Response, next: any) => void;
export default loggerMiddleware;
