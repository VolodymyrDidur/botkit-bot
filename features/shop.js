const categoriesTemplate = require('../bestbuy/categories');

module.exports = (controller) => {
  controller.on('message', async (bot, message) => {
    await categoriesTemplate(1).then(async (categories) => {
      if (message.quick_reply.payload === 'SHOP') {
        await bot.reply(message, categories);
      }
    });
  });
};
