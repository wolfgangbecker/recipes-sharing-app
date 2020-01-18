# Recipe app

This app lets users manage their recipes.
It's primarily built with [Svelte](https://svelte.dev/) and [Serverless](https://serverless.com/).

## How to install

### 1. Backend
1. Go to `/backend`
2. Install the [Serverless CLI](https://serverless.com/framework/docs/getting-started/) (`npm install -g serverless`)
3. [Configure AWS credentials](https://serverless.com/framework/docs/providers/aws/cli-reference/config-credentials/)
4. Run `npm install`
5. Deploy with `sls deploy`

After deploying, check the console logs for information about the `endpoints` (needed to configure the frontend).

### 2. Frontend
1. Go to `/frontend`
2. Edit `config.js` with the information from the backend deployment. You'll also need to provide [Auth0](https://auth0.com/) credentials here.
3. Run `npm install`
4. Start with `npm start`

By default, the app will be made available on `http://localhost:1234`.
