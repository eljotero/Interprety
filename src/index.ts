import * as express from "express"
import * as bodyParser from "body-parser"
import { Request, Response, Express } from "express"
import { AppDataSource } from "./data-source"
import { Routes } from "./routes"
import { cors } from 'cors';

AppDataSource.initialize().then(async () => {

    const app: Express = express()
    app.use(bodyParser.json())
    app.use(cors);

    Routes.forEach(route => {
        (app as any)[route.method](route.route, async (req: Request, res: Response, next: Function) => {
            try {
                const result = await (new (route.controller as any))[route.action](req, res, next);
                res.json(result);
            } catch (error) {
                next(error);
            }
        })
    })
    app.listen(3000)

    console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results")

}).catch(error => console.log(error))
