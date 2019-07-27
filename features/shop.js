module.exports = (controller) => {
  controller.on('message', async (bot, message) => {
    if (message.quick_reply.payload === 'SHOP') {
      await bot.reply(message, 'shop');
    }
  });
};
