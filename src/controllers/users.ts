import express from 'express';

import { getUsers } from '../db/users';

export const getAllUsers = async (req:express.Request, res: express.Response, next: express.NextFunction)=>{
    try {
        const users = getUsers();

        return res.status(200).json(users)
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}