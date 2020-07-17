const TelegramBot = require('node-telegram-bot-api'); // подключаем node-telegram-bot-api
const token = '1150771677:AAFlSUgvacYTrTVC3EKyKE7OtQWRBrao-2I';

const { photosProcessMessage } = require('./photo.js');
const { textProcessMessage } = require('./text.js');


const bot = new TelegramBot(token, {polling: true});

// обработчик события присылания нам любого сообщения
bot.on('message', (msg) => {
  const chatId = msg.chat.id; //получаем идентификатор диалога, чтобы отвечать именно тому пользователю, который нам что-то прислал
  console.log(msg);
  photosProcessMessage(bot, msg);

  if (msg.photo && msg.photo.length > 0) {
  } else if (msg.text === '/start') {
    bot.sendMessage(chatId, "Привет! Я Маленький бот который учиться определять ваше настроение по фотографии и приклеивать стикер в зависимости от того как я его понял! Моя нейронка еще очень маленькая, поэтому помоги мне понять все ли я правильно делаю, и ты увидишь как я буду все лучше и лучше!");
  }
});

//обработчик событий нажатий на клавиатуру
bot.on('callback_query', (query) => {
  const chatId = query.message.chat.id;
  console.log(query.data);
  let text = '';

  if (query.data === 'super') { // если кот
    text = 'Спасибо, я быстро учусь!';
  }

  if (query.data === 'dick') { // если пёс
    text = 'У меня все в переди!';
  }

  bot.sendMessage(chatId, text);
});