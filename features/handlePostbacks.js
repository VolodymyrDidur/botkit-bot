const mainMenu = require('./postbacks/mainMenu');

module.exports = (controller) => {
  controller.on('facebook_postback', (bot, message) => {
    const { payload } = message.postback;

    switch (payload) {
      case 'MAIN_MENU':
        mainMenu(message);
        break;
      default:
        break;
    }
  });
};
