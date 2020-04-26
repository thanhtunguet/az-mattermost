import express, { Application } from 'express';
import { createServer, Server } from 'http';
import { router } from 'routes';

const app: Application = express();
const server: Server = createServer(app);

app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));

app.use(router);

const {
  PORT = 8080,
} = process.env;

server.listen(PORT, () => {
  // tslint:disable-next-line: no-console
  console.log('Web server is up and running, port %d', PORT);
});
