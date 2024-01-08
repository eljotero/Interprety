import * as express from "express"
import * as bodyParser from "body-parser"
import { Request, Response } from "express"
import { AppDataSource } from "./data-source"
import { Routes } from "./routes"

AppDataSource.initialize().then(async () => {

    const app = express()
    app.use(bodyParser.json())

    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const controllerInstance = new (route.controller as any)();
            const action = route.action;
            console.log(`Attempting to call action ${action} on controller ${route.controller.name}`);
            const result = controllerInstance[action](req, res, next);
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined)
            } else if (result !== null && result !== undefined) {
                res.json(result)
            }
        })
    })
    app.listen(3000)
}).catch(error => console.log(error))
