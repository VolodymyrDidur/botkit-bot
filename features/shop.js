const sendCategoriesPage = require('../bestbuy/categories');

module.exports = (controller) => {
  controller.on('message', async (bot, message) => {
    if (message.quick_reply.payload === 'SHOP') {
      global.categoriesPage = 1;
      await sendCategoriesPage(global.categoriesPage).then(async (categories) => {
        await bot.reply(message, categories);
      });
    } else if (message.quick_reply.payload === 'NEXT_CATEGORY_PAGE') {
      global.categoriesPage += 1;
      await sendCategoriesPage(global.categoriesPage).then(async (categories) => {
        await bot.reply(message, categories);
      });
    } else if (message.quick_reply.payload === 'PREV_CATEGORY_PAGE') {
      global.categoriesPage -= 1;
      await sendCategoriesPage(global.categoriesPage).then(async (categories) => {
        await bot.reply(message, categories);
      });
    }
  });
};
