const bby = require('bestbuy')(process.env.bestbuy_key);

module.exports = async (categoriesPage) => {
  const ITEMS_PER_PAGE = 9;
  const categoriesTemplate = {
    text: 'Choose your category',
    quick_replies: [
    ],
  };

  await bby.categories('', { show: 'name,id', page: categoriesPage, pageSize: ITEMS_PER_PAGE }).then((data) => {
    if (data.currentPage !== 1) {
      categoriesTemplate.quick_replies.push({
        content_type: 'text',
        title: 'prev',
        payload: 'PREV_CATEGORY_PAGE',
      });
    }

    data.categories.forEach((category) => {
      categoriesTemplate.quick_replies.push({
        content_type: 'text',
        title: category.name,
        payload: category.id,
      });
    });

    if (data.currentPage !== data.totalPages) {
      categoriesTemplate.quick_replies.push({
        content_type: 'text',
        title: 'next',
        payload: 'NEXT_CATEGORY_PAGE',
      });
    }
  });

  return categoriesTemplate;
};
