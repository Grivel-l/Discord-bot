const cheerio = require('cheerio');
const fetch = require('./index.js')

module.exports = () => {
  return fetch('http://random.dog')
  .then(htmlString => {
    const $ = cheerio.load(htmlString);
    return `https://random.dog/${$('img').attr('id', 'dog-img')[0].attribs.src}`;
  });
};
