export const WEBHOOK_URL: string = process.env.WEBHOOK_URL;

if (typeof WEBHOOK_URL !== 'string' || WEBHOOK_URL === '') {
  // tslint:disable-next-line: no-console
  console.error('WEBHOOK_URL must be defined, please use env file or export an environment variable by `export WEBHOOK_URL=<your-webhook-url>');
}
