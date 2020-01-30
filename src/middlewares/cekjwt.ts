import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.auth as string;
  let jwtPayload;
  if (req.path === '/api/v1/login') {
    next();
  } else {
    try {
        jwtPayload = (jwt.verify(token, 'rahasia') as any);
        res.locals.jwtPayload = jwtPayload;
      } catch (error) {
        console.log('no auth');
        res.status(401).end();
      }
      const { id, email, level } = jwtPayload;
      const newToken = jwt.sign({ id, email, level }, 'rahasia', {
        expiresIn: "1h"
      });
      res.setHeader("token", newToken);
      next();
  }
};