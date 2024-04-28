import * as express from "express";

export default abstract class HttpController {
    public router: express.Router;
    public path: string;
    constructor() {
        this.router = express.Router();
        this.path = "/";
    }

    public abstract initializeRoutes(): void;
}