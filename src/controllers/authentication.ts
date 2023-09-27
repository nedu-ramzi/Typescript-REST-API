import express from 'express';
import {createUser, getUserByEmail} from '../db/users';
import { random , authentication} from '../helpers';

export const login = async (req: express.Request, res: express.Response)=>{
    try {
        const {email, password} = req.body;

        if(!email || !password){
            console.log('fields empty');
            res.sendStatus(400);
        }
        const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');
        if(!user){
            return res.sendStatus(400);
        }

        const expectedHash = authentication(user.authentication.salt, password);
        if (user.authentication.password !== expectedHash) {
            return res.sendStatus(403);
        }
        const salt = random();
        user.authentication.sessionToken = authentication(salt, user._id.toString());

        await user.save();

        res.cookie('RAMSEY-AUTH', user.authentication.sessionToken, {domain: 'localhost', path: '/'});
        
        return res.status(200).json(user).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}
export const register = async (req: express.Request, res: express.Response)=>{
    try {
        const {email, password, username} = req.body;

        if(!email || !password || !username){
            return res.sendStatus(400);
            console.log("fields empty");
        }

        const existingUser = await getUserByEmail(email);

        if(existingUser){
            return res.sendStatus(400);
            console.log(`${existingUser} already exist`);
        }
        const salt = random();
        const user = await createUser({
            email,
            username,
            authentication:{
                salt,
                password: authentication(salt, password),
            },
        });
        console.log(user);
        return res.status(200).json(user).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}