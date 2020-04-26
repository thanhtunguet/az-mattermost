import axios, { AxiosError } from 'axios';
import { WEBHOOK_URL } from 'consts';
import { Router } from 'express';

export const router = Router();

// Webhook that Azure Service Webhook will post to
router.post('/webhook', (req, res) => {
  if (typeof req.body === 'object' && req.body !== null) {
    // Stringify the request body
    const json: string = JSON.stringify(req.body);
    // Get list of AD users
    const userList: RegExpMatchArray = (json as string).match(/<DOCUMENT\\\\([A-Za-z0-9]+)>/gm);
    // Get username on Mattermost
    const uniqueUsers: { [key: string]: string } = {}; // Create a username map
    userList?.forEach((devopsUsername: string) => {
      const username: string = devopsUsername.replace(/<DOCUMENT\\\\([A-Za-z0-9]+)>/gm, '$1');
      uniqueUsers[username] = username;
    });
    // Get the message content in Markdown format
    const {
      detailedMessage: {
        markdown = '',
      } = {},
    } = req.body;
    // Send message to people
    Object
      .keys(uniqueUsers)
      .forEach((username: string) => {
        axios.post(WEBHOOK_URL, {
          channel: `@${username}`,
          text: markdown,
        })
          .then(() => {
            // tslint:disable-next-line: no-console
            console.log('Sending message to %s successfully!', username);
          })
          .catch((error: AxiosError) => {
            // tslint:disable-next-line: no-console
            console.log('Error: %s', error?.response?.data);
          });
      });
  }
  res.status(200).send('OK');
});

router.use('/', (req, res) => {
  // tslint:disable-next-line: no-console
  console.log(req.url);
  res
    .status(200)
    .send('OK');
});
