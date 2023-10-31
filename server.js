#!/usr/bin/env node
//ORIGIN=http://localhost:3000 node build/index.js  run with
import * as dotenv from 'dotenv'
dotenv.config()
import { handler } from './build/handler.js';
import express from 'express';
import { create } from "./src/lib/server/logger.js"

const p = process.argv.slice(2)
const logger = create()

// logger.info(process.env.PORT);

const app = express();
const PORT = +p || 3000;

try{
    app.use(handler);
    
    app.listen(PORT, ()=> {
        logger.info(`listening on port: ${PORT}`);
    });

}
catch(e){
    logger.error("ERROR!!!");
    logger.error(e.message);
}