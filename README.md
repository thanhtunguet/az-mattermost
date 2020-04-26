Azure Devops + Mattermost service hooks
======================================

### Create a webhook URL using administrator's account.

This account will be used to send messages to people so it is recommended to create an specific account for this intergration purpose

### Create a .env file

```
WEBHOOK_URL=https://your-mattermost-webhook-url
```

### Start the service

```sh
docker-compose up -d
```
