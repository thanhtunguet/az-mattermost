import axios, { AxiosError } from 'axios';
import { WEBHOOK_URL } from 'consts';
import express, { Application } from 'express';
import { createServer, Server } from 'http';

const app: Application = express();
const server: Server = createServer(app);

app.use(express.urlencoded({
  extended: true,
}));
app.use(express.json());

app.get('/', (...[, res]) => {
  res.send('OK');
});

// Webhook that Azure Service Webhook will post to
app.post('/webhook', (req, res) => {
  if (typeof req.body === 'object' && req.body !== null) {
    const json: string = JSON.stringify(req.body);
    const userList: RegExpMatchArray = (json as string).match(/<DOCUMENT\\\\([A-Za-z0-9]+)>/gm);
    const uniqueUsers: { [key: string]: string } = {};
    userList?.forEach((user: string) => {
      const username: string = user.replace(/<DOCUMENT\\\\([A-Za-z0-9]+)>/gm, '$1');
      uniqueUsers[username] = username;
    });
    const {
      detailedMessage: {
        markdown = '',
      } = {},
    } = req.body;
    Object
      .keys(uniqueUsers)
      .forEach((user: string) => {
        axios.post(WEBHOOK_URL, {
          channel: `@${user}`,
          text: markdown,
        })
          .catch((error: AxiosError) => {
            // tslint:disable-next-line: no-console
            console.log('Error: %s', error.response.data);
          });
      });
  }
  res.send('OK');
});

const {
  PORT = 8080,
} = process.env;

server.listen(PORT, () => {
  // tslint:disable-next-line: no-console
  console.log('Web server is up and running, port %d', PORT);
});
