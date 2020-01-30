"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
exports.checkJwt = (req, res, next) => {
    const token = req.headers.auth;
    let jwtPayload;
    if (req.path === '/api/v1/login') {
        next();
    }
    else {
        try {
            jwtPayload = jwt.verify(token, 'rahasia');
            res.locals.jwtPayload = jwtPayload;
        }
        catch (error) {
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
//# sourceMappingURL=cekjwt.js.map