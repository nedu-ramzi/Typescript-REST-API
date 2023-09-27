import express from 'express';
import { register, login } from '../controllers/authentication';


//we are exporting the file itself (authentication.ts) defaultly with the param below
export default (router: express.Router) =>{
    router.post('/auth/register', register);
    router.post('/auth/login', login);
};
