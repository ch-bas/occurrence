var express = require('express');
var router = express.Router();
const cheerio = require('cheerio');
const rp = require('request-promise');
const options = {
    uri: '',
    transform: function (body) {
        return cheerio.load(body);
    }
};
//definition of the different urls to explore
var urls = [
    "https://en.wikipedia.org/wiki/George_Washington",
    "https://en.wikipedia.org/wiki/Founding_Fathers_of_the_United_States"
];

router.get('/:input', function (req, res, next) {
    //resultArray is an array which store the different combination between url and number of occurrence of the string
    var resultArray = [];
    //iteration is to know exactly when we have finished the different request
    var iteration = 0;
    for (let i = 0; i < urls.length; i++) {
        //injection of the different urls
        options.uri = urls[i];
        //here we do the request
        rp(options)
            .then(($) => {
                //this is the Regex expression definition , where the first argument is the string we want to search the number of its occurrence
                var regexp = new RegExp(req.params.input, 'gi');
                var body = $.text();
                var match, matches = [];
                //this the part where we search for all the possible matches
                while ((match = regexp.exec(body)) !== null) {
                    //if we find a match, we store it in an the specified array
                    matches.push(match.index);
                }
                //we create an object to store the number of occurrence of the word according to each url
                let json = {url: '', occurrence: 0};
                json.occurrence = matches.length;
                json.url = urls[i];
                //we store our object in the array
                resultArray.push(json);
                //we increment the number of iteration as we had finished the 'i' iteration
                iteration++;
                //if we had made all the request, we return the result to the view
                if (iteration === urls.length) {
                    res.render('counts', {url: resultArray, matched: req.params.input });
                }
            })
            .catch((err) => {
                //in case of an error, we return it in the console
                console.log(err);
            });
    }
});

module.exports = router;
