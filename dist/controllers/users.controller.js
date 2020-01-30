"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const typeorm_1 = require("typeorm");
const bcrypt = require("bcryptjs");
class UsersController {
    constructor() {
        this.path = '/';
        this.router = express.Router();
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let users;
            const userRepo = typeorm_1.getRepository('users');
            if (!req.body.email)
                res.json({ message: 'email is empty' }).status(404).end();
            if (!req.body.password)
                res.json({ message: 'password is empty' }).status(404).end();
            users = yield userRepo.findOne({ where: { email: req.body.email } });
            if (users) {
                if (yield bcrypt.compare(req.body.password, users.password)) {
                    res.json(users).status(200).end();
                }
                else {
                    res.json({ message: 'password not match' }).status(404).end();
                }
            }
            else {
                res.json({ message: 'user not found' }).status(404).end();
            }
        });
        this.users = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let users;
            const userRepo = typeorm_1.getRepository('users');
            if (req.params.id) {
                const id = parseInt(req.params.id, 10);
                users = yield userRepo.findOne({ id });
            }
            else {
                users = yield userRepo.find();
            }
            if (users) {
                res.json(users).status(200).end();
            }
            else {
                res.json({ message: 'not found' }).status(404).end();
            }
        });
        this.insertUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const userRepo = typeorm_1.getRepository('users');
            if (res.locals.jwtPayload.level === 'member') {
                res.status(401).end();
            }
            if (!req.body.email || req.body.email.length < 1 || !/^[A-Za-z0-9._%+-]+@(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})$/.test(req.body.email)) {
                res.json({ message: 'email is empty' }).status(404).end();
            }
            if (!req.body.fullname || req.body.fullname.length < 1) {
                res.json({ message: 'fullname is empty' }).status(404).end();
            }
            if (!req.body.telp || req.body.telp.length < 1) {
                res.json({ message: 'telp is empty' }).status(404).end();
            }
            if (!req.body.password || req.body.telp.length < 6) {
                res.json({ message: 'telp is empty' }).status(404).end();
            }
            req.body.password = yield bcrypt.hash(req.body.password, 10);
            const newUser = userRepo.create(req.body);
            const saved = yield userRepo.save(newUser);
            res.json(saved).status(201).end();
        });
        this.updateUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const userRepo = typeorm_1.getRepository('users');
            const id = parseInt(req.params.id, 10);
            if (res.locals.jwtPayload.id === req.params.id) {
                res.status(401).end();
            }
            if (!req.body.email || req.body.email.length < 1 || !/^[A-Za-z0-9._%+-]+@(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})$/.test(req.body.email)) {
                res.json({ message: 'email is empty' }).status(404).end();
            }
            if (!req.body.fullname || req.body.fullname.length < 1) {
                res.json({ message: 'fullname is empty' }).status(404).end();
            }
            if (!req.body.telp || req.body.telp.length < 1) {
                res.json({ message: 'telp is empty' }).status(404).end();
            }
            if (!req.body.password || req.body.telp.length < 6) {
                res.json({ message: 'telp is empty' }).status(404).end();
            }
            req.body.password = yield bcrypt.hash(req.body.password, 10);
            yield userRepo.update({ id }, req.body);
            const saved = userRepo.findOne({ id });
            res.json(saved).status(200).end();
        });
        this.deleteUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            if (res.locals.jwtPayload.level === 'admin') {
                res.status(401).end();
            }
            const userRepo = typeorm_1.getRepository('users');
            const id = parseInt(req.params.id, 10);
            yield userRepo.delete({ id });
            res.json({ result: 'success deleted' }).status(200).end();
        });
        this.initRoutes();
    }
    initRoutes() {
        this.router.get('/users', this.users);
        this.router.get('/users/:id', this.users);
        this.router.post('/users', this.insertUser);
        this.router.post('/auth/login', this.login);
        this.router.put('/users/:id', this.updateUser);
        this.router.delete('/users/:id', this.deleteUser);
    }
}
exports.default = UsersController;
//# sourceMappingURL=users.controller.js.map