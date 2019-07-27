require('dotenv').config();
const { Botkit } = require('botkit');
const { FacebookAdapter, FacebookEventTypeMiddleware } = require('botbuilder-adapter-facebook');

const facebookAdapter = new FacebookAdapter({
  access_token: process.env.access_token,
  verify_token: process.env.verify_token,
  app_secret: process.env.app_secret,
});
facebookAdapter.use(new FacebookEventTypeMiddleware());

const controller = new Botkit({
  adapter: facebookAdapter,
  webhook_uri: '/facebook/receive',
});

controller.ready(() => {
  controller.loadModules(`${__dirname}/features`);
});
