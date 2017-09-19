const Discord = require('discord.js');

const Config = require('./config');
const {
  salute,
  positiveAnswers,
  negativeAnswers,
  animals
} = require('./sentences');
const getCat = require('./api/getCat');
const getDog = require('./api/getDog');

const client = new Discord.Client();
const users = {};

function upper(content) {
  return `${content.substring(0, 1).toUpperCase()}${content.substring(1).toLowerCase()}`;
}

function formatMessage(message) {
  return message.content.toLowerCase().trim();
}

function cleanUser(username) {
  users[username].timestamp = null;
}

function answer(content, message, username, file = null) {
  if (file !== null) {
    message.reply(content, {files: [file]});
  } else {
    message.reply(content);
  }
  cleanUser(username);
}

client.on('ready', () => {
  console.log('Bot is ready');
});

client.on('message', message => {
  const {username} = message.author;
  if (username === Config.botName) {
    return null;
  } else {
    if (users[username] === undefined || users[username].timestamp === null) {
      users[username] = {
        timestamp: Date.now(),
        action: null
      };
    } else {
      if (Date.now() - users[username].timestamp > 15000) {
        users[username] = {
          timestamp: Date.now(),
          action: null
        };
      }
    }
  }
  
  const messageContent = formatMessage(message);

  if (salute.includes(messageContent)) {
    message.reply(upper(messageContent));
  }

  if ((messageContent.includes('would like') ||
    messageContent.includes('want')) &&
    messageContent.includes('adopt') &&
    messageContent.includes('animal')) {
    if (users[username].action === null) {
      users[username].action = 'adopting';
      message.reply('Do you want a cat or a dog ?');
    }
  }
  
  if (users[username].action === 'adopting') {
    if (animals.includes(messageContent)) {
      if (messageContent.includes('cat')) {
        getCat()
        .then(url => {
          answer(`Here ${messageContent.substring(messageContent.length - 1) === 's' ? 'are' : 'is'} your ${messageContent}`, message, username, url);
        });
      } else {
        getDog()
        .then(url => {
          answer(`Here ${messageContent.substring(messageContent.length - 1) === 's' ? 'are' : 'is'} your ${messageContent}`, message, username, url);
        });
      }
    }
  }
});

client.login(Config.botToken);
