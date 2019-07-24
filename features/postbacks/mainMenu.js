const request = require('request');

module.exports = (message) => {
  const body = {
    recipient: {
      id: message.sender.id,
    },
    message: {
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
    },
  };

  request({
    uri: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: process.env.access_token },
    method: 'POST',
    json: body,
  }, (err) => {
    if (err) throw err;
  });
};
