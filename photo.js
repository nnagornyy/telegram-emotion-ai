const fs = require('fs')
var https = require('https');
const sharp = require('sharp');
sharp.cache(false);

const reaction = [
  'reaction-00001.webp',
  'reaction-00002.webp',
  'reaction-00003.webp',
  'reaction-00004.webp',
  'reaction-00005.webp',
  'reaction-00006.webp',
  'reaction-00007.webp',
  'reaction-00008.webp',
  'reaction-00009.webp',
  'reaction-00010.webp',
  'reaction-00011.webp',
  'reaction-00012.webp',
  'reaction-00013.webp',
  'reaction-00014.webp',
  'reaction-00015.webp',
  'reaction-00016.webp',
  'reaction-00017.webp',
  'reaction-00018.webp',
  'reaction-00019.webp',
  'reaction-00020.webp',
  'reaction-00021.webp',
  'reaction-00022.webp',
  'reaction-00023.webp',
  'reaction-00024.webp',
  'reaction-00025.webp',
  'reaction-00026.webp',
  'reaction-00027.webp',
];

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getMaterMark(){
  console.log('./dick/' + reaction[getRandomIntInclusive(0, reaction.length - 1)]);
  return './dick/' + reaction[getRandomIntInclusive(0, reaction.length - 1)];
}

let waterMark = getMaterMark();

exports.photosProcessMessage = (instance, msg) => {
  // console.log(msg);
  let fileId;
  let filePath;

  donwloadMessageFile(instance, msg.photo)
    .then(res => {
      console.log('222');
      sendPhoto(instance, msg)
    })
};

function donwloadMessageFile(bot, photos){
  return new Promise((res, err) => {
    bot.getFile(photos[0].file_id)
    .then(data => {
      console.log(data );
      let url  = "https://api.telegram.org/file/bot1150771677:AAFlSUgvacYTrTVC3EKyKE7OtQWRBrao-2I/"+data.file_path;
      let file = fs.createWriteStream('./dest.jpg');
      console.log(url);
      https.get(url, function(response) {
        response.pipe(file);
        file.on('finish', function() {
            file.close();
            return res(true);
        });
      });
    })
  });
}

function sendPhoto(instanse, msg) {
  console.log('3333');
   sharp(getMaterMark()).resize(80, 80).toBuffer()
    .then(data => {
      sharp('./dest.jpg')
        .composite([{
          input: data,
          blend: 'over',
          top: 0,
          left: 0
        }])
        .toFile('./output.jpg', (err, info) => {
          console.log(msg.message_id);
          instanse.sendPhoto(msg.chat.id, './output.jpg');
          instanse.deleteMessage(msg.chat.id, msg.message_id)

          const opts = {
            reply_markup: JSON.stringify({
              inline_keyboard: [
                [
                  {
                    text: 'Да ❤', // текст на кнопке
                    callback_data: 'super' // данные для обработчика событий
                  }
                ],
                [
                  {
                    text: 'Хуево...',
                    callback_data: 'dick'
                  }
                ]
              ]
            })
          };
          instanse.sendMessage(msg.chat.id, 'Я правильно понял настроение?', opts);

          fs.unlink('./output.jpg');
          fs.unlink('./dest.jpg');
        });
      
  });
}


