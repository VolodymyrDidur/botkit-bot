const sendCategoriesPage = require('../bestbuy/categories');

module.exports = (controller) => {
  let categoriesPage;

  controller.hears((message) => {
    const { payload } = message.quick_reply;
    return payload === 'SHOP'
      || payload === 'NEXT_CATEGORY_PAGE'
      || payload === 'PREV_CATEGORY_PAGE';
  }, 'message', async (bot, message) => {
    const { payload } = message.quick_reply;

    if (payload === 'SHOP') {
      categoriesPage = 1;
    } else if (payload === 'NEXT_CATEGORY_PAGE') {
      categoriesPage += 1;
    } else if (payload === 'PREV_CATEGORY_PAGE') {
      categoriesPage -= 1;
    }

    await sendCategoriesPage(categoriesPage).then(async (categories) => {
      await bot.reply(message, categories);
    });
  });
};
