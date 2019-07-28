const categoriesTemplate = require('../bestbuy/categories');

module.exports = (controller) => {
  controller.on('message', async (bot, message) => {
    if (message.quick_reply.payload === 'SHOP') {
      await categoriesTemplate(1).then(async (categories) => {
        await bot.reply(message, categories);
      });
    }
  });
};
