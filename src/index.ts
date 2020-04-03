import axios from 'axios';
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
  if (req?.body?.message?.markdown) {
    const { message: { markdown } } = req.body;
    const assignedUserMatches: RegExpMatchArray = (markdown as string).match(/Assigned to: (.*) <DOCUMENT\\([A-Za-z0-9]+)>/);
    if (assignedUserMatches instanceof Array) {
      const username: string = assignedUserMatches[2];
      console.log(username);
      axios.post(WEBHOOK_URL, {
        channel: `@${username}`,
        text: markdown,
        markdown,
      });
    }
  }
  res.send('OK');
});

const {
  PORT = 8080,
} = process.env;

server.listen(PORT, () => {
  console.log('Web server is up and running, port %d', PORT);
});
