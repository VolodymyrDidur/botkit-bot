const mainMenu = {
  text: 'Main menu:',
  quick_replies: [
    {
      content_type: 'text',
      title: 'My purchases',
      payload: 'MY_PURCHASES',
    },
    {
      content_type: 'text',
      title: 'Shop',
      payload: 'SHOP',
    },
    {
      content_type: 'text',
      title: 'Favorites',
      payload: 'FAVORITES',
    },
    {
      content_type: 'text',
      title: 'To invite a friend',
      payload: 'TO_INVITE_A_FRIEND',
    },
  ],
};

module.exports = (controller) => {
  controller.on('facebook_postback', async (bot, message) => {
    if (message.postback.payload === 'MAIN_MENU') {
      await bot.reply(message, mainMenu);
    }
  });
};
