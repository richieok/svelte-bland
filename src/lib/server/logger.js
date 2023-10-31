import { createLogger, format, transports } from "winston";
import { resolve } from 'path'
import * as dotenv from 'dotenv'
dotenv.config()

// const { LOG_DIR, NODE_ENV } = await getParams()
const folder = resolve('.').split('/').at(-1)
console.log(folder);
let LOG_DIR = `/var/log/apps/${folder}`

export const create = (() => {
    let logger
    function init() {
        if (!logger) {
            console.log("Initializing Solution");
            if (process.env?.LOCATION === 'local') {
                logger = createLogger({
                    level: "info",
                    format: format.json(),
                    transports: [
                        new transports.Console(),
                    ]
                })
            } else {
                logger = createLogger({
                    transports: [
                        new transports.File({
                            filename: `${LOG_DIR}/server.log`,
                            level: "info",
                            format: format.combine(
                                format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
                                format.align(),
                                format.printf(
                                    (info) => `${info.level}: ${[info.timestamp]}: ${info.message}`
                                )
                            ),
                        }),
                        new transports.File({
                            filename: `${LOG_DIR}/error.log`,
                            level: "error",
                            format: format.combine(
                                format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
                                format.align(),
                                format.printf(
                                    (error) => `${error.level}: ${[error.timestamp]}: ${error.message}`
                                )
                            )
                        })
                    ],
                });
            }
            return
        }
        console.log("Solution already initialized");
    }
    return () => {
        init()
        return logger
    }
})()