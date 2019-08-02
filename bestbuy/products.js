const bby = require('bestbuy')(process.env.bestbuy_key);

module.exports = async (category, productsPage) => {
  const ITEMS_PER_PAGE = 7;
  let numberOfPages = 0;
  const productsTemplate = {
    attachment: {
      type: 'template',
      payload: {
        template_type: 'generic',
        elements: [
        ],
      },
    },
  };

  await bby.products(
    `categoryPath.id=${category}`,
    { show: 'image,productId,name,regularPrice', page: productsPage, pageSize: ITEMS_PER_PAGE },
  ).then(async (data) => {
    numberOfPages = data.totalPages;
    data.products.forEach((product) => {
      productsTemplate.attachment.payload.elements.push({
        title: product.name,
        image_url: product.image,
      });
    });
  });

  return {
    template: productsTemplate,
    pagesCount: numberOfPages,
  };
};
