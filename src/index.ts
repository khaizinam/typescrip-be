import App from "./app";
import fs from 'fs';
import path from 'path';
import HttpController from './core/HttpController';

require('dotenv').config();
const routesDir = path.join(__dirname, 'controllers');

const routeInstances: HttpController[] = [];

fs.readdirSync(routesDir).forEach(file => {
    if (file.endsWith('.ts')) {
        import(path.join(routesDir, file)).then(routeFile => {
            if (typeof routeFile.default === 'function' && routeFile.default.prototype instanceof HttpController) {
                routeInstances.push(new routeFile.default()); 
                if (routeInstances.length === fs.readdirSync(routesDir).filter(f => f.endsWith('.ts')).length) {
                    startApp(routeInstances);
                }
            }
        });
    }
});

function startApp(listRoute: HttpController[] ):void {
    const port = process.env.PORT || 3000;
    const app = new App(listRoute, port);
    app.listen();
}