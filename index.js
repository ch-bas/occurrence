const rp = require('request-promise');
const cheerio = require('cheerio');
const options = {
    uri: '',
    transform: function (body) {
        return cheerio.load(body);
    }
};
//list of urls
var urls = [
    "https://en.wikipedia.org/wiki/George_Washington",
    "https://en.wikipedia.org/wiki/Founding_Fathers_of_the_United_States"
];

var str = process.argv[2];
console.log('Occurences of word : ' + str);
for (let i = 0; i < urls.length; i++) {
    options.uri = urls[i];
    rp(options)
        .then(($) => {

            var regexp = new RegExp(str, 'gi');
            var body = $.text();
            var match, matches = [];

            while ((match = regexp.exec(body)) !== null) {
                matches.push(match.index);
            }
            console.log(urls[i] + ' => ' + matches.length);
        })
        .catch((err) => {
            console.log(err);
        });
}

	
    
