const rp = require('request-promise');
const cheerio = require('cheerio');
const options = {
    uri: '',
    transform: function (body) {
        return cheerio.load(body);
    }
};
var urls = [
    "https://www.uniberg.com/index.html",
    "https://www.uniberg.com/leistungen.html",
    "https://www.uniberg.com/referenzen.html",
    "https://www.uniberg.com/karriere.html",
    "https://www.uniberg.com/kontakt.html"
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

	
    