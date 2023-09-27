import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compresion from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './router';

const app = express();

app.use(cors({
    credentials : true,
}));
app.use(compresion());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

const port : number = 8081;
server.listen(port,()=>{
    console.log(`Server running on http://localhost:${port}/`);
});

const MONGO_URI = 'mongodb+srv://mortaldeity:908477@testrun.y0phshe.mongodb.net/?retryWrites=true&w=majority';

//initialize mongoose
mongoose.Promise = Promise;
mongoose.connect(MONGO_URI);
mongoose.connection
.on('error', (error:Error) => console.log(error))
.on('open', ()=>console.log('mongoose connected successfully'));

app.use('/', router())