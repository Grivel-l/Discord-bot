const Discord = require('discord.js');

const Config = require('./config');

const client = new Discord.Client();
const salute = ['hello', 'salut', 'bonjour', 'yo', 'bonsoir'];

function upper(content) {
  return `${content.substring(0, 1).toUpperCase()}${content.substring(1).toLowerCase()}`;
}

client.on('ready', () => {
  console.log('Bot is ready');
});

client.on('message', message => {
  if (salute.includes(message.content.toLowerCase())) {
    message.reply(upper(message.content));
  }
});

client.login(Config.botToken);
