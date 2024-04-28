
import express from 'express';
import BaseRouteAbstract from './core/HttpController';
const displayRoutes = require('express-routemap') ;
class App {
    public app: express.Application;
    public port: number | string;

    constructor(controllers: BaseRouteAbstract[], port: number | string) {
        this.app = express();
        this.port = port;

        this.initializeMiddlewares();
        this.initializeControllers(controllers);
    }
    private initializeMiddlewares() {
        this.app.use(express.json());
    }
    private initializeControllers(controllers: BaseRouteAbstract[]) {
        this.app.all("/", (req, res) => {
            res.status(200).send("SERVER RUNNING");
        });

        controllers.forEach((controller, index) => {
            this.app.use(controller.path, controller.router);
        });

        this.app.all("*", (req, res) => {
            res.status(400).send("Not found that url!");
        });
        
    }
    public listen(): void {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port http://127.0.0.1:${this.port}`);
            displayRoutes(this.app);
        });
    }
}
export default App;