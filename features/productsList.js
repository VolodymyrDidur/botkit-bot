const sendProductsPage = require('../bestbuy/products');

const getPageButtons = (page, pageCount) => {
  const pageButtons = {
    text: 'Couldn\'t find your product?',
    quick_replies: [],
  };

  if (page === 1) {
    pageButtons.quick_replies = [{
      content_type: 'text',
      title: 'next',
      payload: 'NEXT_PRODUCTS_PAGE',
    }];
  } else if (page === pageCount) {
    pageButtons.quick_replies = [{
      content_type: 'text',
      title: 'prev',
      payload: 'PREV_PRODUCTS_PAGE',
    }];
  } else {
    pageButtons.quick_replies = [
      {
        content_type: 'text',
        title: 'prev',
        payload: 'PREV_PRODUCTS_PAGE',
      },
      {
        content_type: 'text',
        title: 'next',
        payload: 'NEXT_PRODUCTS_PAGE',
      },
    ];
  }

  return pageButtons;
};

module.exports = (controller) => {
  let productsPage;
  let category;

  controller.hears((message) => {
    const { payload } = message.quick_reply;
    return payload.startsWith('abcat')
      || payload === 'NEXT_PRODUCTS_PAGE'
      || payload === 'PREV_PRODUCTS_PAGE';
  }, 'message', async (bot, message) => {
    const { payload } = message.quick_reply;

    if (payload.startsWith('abcat')) {
      productsPage = 1;
      category = payload;
    } else if (payload === 'NEXT_PRODUCTS_PAGE') {
      productsPage += 1;
    } else if (payload === 'PREV_PRODUCTS_PAGE') {
      productsPage -= 1;
    }

    await sendProductsPage(category, productsPage).then(async (products) => {
      await bot.reply(message, products.template);
      await bot.reply(message, getPageButtons(productsPage, products.pagesCount));
    });
  });
};
