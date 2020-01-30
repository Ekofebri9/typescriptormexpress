import * as express from 'express'
import { Request, Response } from 'express'
import IControllerBase from '../interfaces/IControllerBase.interface'
import { getRepository } from 'typeorm'
import { User } from "../entity/users";
import * as bcrypt from 'bcryptjs';

class UsersController implements IControllerBase {
    public path = '/';
    public router = express.Router();

    constructor() {
        this.initRoutes();
    }

    public initRoutes() {
        this.router.get('/users', this.users);
        this.router.get('/users/:id', this.users);
        this.router.post('/users', this.insertUser);
        this.router.post('/auth/login', this.login);
        this.router.put('/users/:id', this.updateUser);
        this.router.delete('/users/:id', this.deleteUser);
    }

    login = async (req: Request, res: Response) => {
        let users:any;
        const userRepo = getRepository('users');
        if(!req.body.email) res.json({message:'email is empty'}).status(404).end();
        if(!req.body.password) res.json({message:'password is empty'}).status(404).end();
        users = await userRepo.findOne({where:{email:req.body.email}});
        if (users) {
            if (await bcrypt.compare(req.body.password, users.password)) {
                res.json(users).status(200).end();
              } else {
                res.json({message:'password not match'}).status(404).end();
              }
        } else {
            res.json({message:'user not found'}).status(404).end();
        }
    }
    users = async (req: Request, res: Response) => {
        let users:any;
        const userRepo = getRepository('users');
        if(req.params.id) {
            const id = parseInt(req.params.id,10);
            users = await userRepo.findOne({id});
        } else {
            users =  await userRepo.find();
        }
        if (users) {
            res.json(users).status(200).end();
        }  else {
            res.json({message: 'not found'}).status(404).end();
        }
    }
    insertUser = async (req: Request, res: Response) => {
        const userRepo = getRepository('users');
        if (res.locals.jwtPayload.level === 'member') {
            res.status(401).end();
        }
        if (!req.body.email || req.body.email.length < 1 || !/^[A-Za-z0-9._%+-]+@(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})$/.test(req.body.email)){
            res.json({message: 'email is empty'}).status(404).end();
        }
        if (!req.body.fullname || req.body.fullname.length < 1 ){
            res.json({message: 'fullname is empty'}).status(404).end();
        }
        if (!req.body.telp || req.body.telp.length < 1){
            res.json({message: 'telp is empty'}).status(404).end();
        }
        if (!req.body.password || req.body.telp.length < 6){
            res.json({message: 'telp is empty'}).status(404).end();
        }
        req.body.password = await bcrypt.hash(req.body.password, 10);
        const newUser = userRepo.create(req.body);
        const saved =  await userRepo.save(newUser);
        res.json(saved).status(201).end();
    }
    updateUser = async (req: Request, res: Response) => {
        const userRepo = getRepository('users');
        const id = parseInt(req.params.id,10);
        if (res.locals.jwtPayload.id === req.params.id) {
            res.status(401).end();
        }
        if (!req.body.email || req.body.email.length < 1 || !/^[A-Za-z0-9._%+-]+@(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})$/.test(req.body.email)){
            res.json({message: 'email is empty'}).status(404).end();
        }
        if (!req.body.fullname || req.body.fullname.length < 1 ){
            res.json({message: 'fullname is empty'}).status(404).end();
        }
        if (!req.body.telp || req.body.telp.length < 1){
            res.json({message: 'telp is empty'}).status(404).end();
        }
        if (!req.body.password || req.body.telp.length < 6){
            res.json({message: 'telp is empty'}).status(404).end();
        }
        req.body.password = await bcrypt.hash(req.body.password, 10);
        await userRepo.update({id},req.body);
        const saved = userRepo.findOne({id})
        res.json(saved).status(200).end();
    }
    deleteUser = async (req: Request, res: Response) => {
        if (res.locals.jwtPayload.level === 'admin') {
            res.status(401).end();
        }
        const userRepo = getRepository('users');
        const id = parseInt(req.params.id,10);
        await userRepo.delete({id});
        res.json({result: 'success deleted'}).status(200).end();
    }

}

export default UsersController