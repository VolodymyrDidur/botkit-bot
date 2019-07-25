const { Botkit } = require('botkit');
const { FacebookAdapter, FacebookEventTypeMiddleware } = require('botbuilder-adapter-facebook');
const { MongoDbStorage } = require('botbuilder-storage-mongodb');
require('dotenv').config();

const mongoStorage = new MongoDbStorage({
  url: process.env.mongo_uri,
});

const facebookAdapter = new FacebookAdapter({
  access_token: process.env.access_token,
  verify_token: process.env.verify_token,
  app_secret: process.env.app_secret,
});
facebookAdapter.use(new FacebookEventTypeMiddleware());

const controller = new Botkit({
  adapter: facebookAdapter,
  storage: mongoStorage,
  webhook_uri: '/facebook/receive',
});

controller.ready(() => {
  controller.loadModules(`${__dirname}/features`);
});
