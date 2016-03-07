var cheerio = require('cheerio');
var rp = require('request-promise');

function scrapePage(url){
	//rp says "once this is done, do the .then function"
	return rp(url)

	//once that loads in...
	.then(function(content){

		//$ refers to the full loaded content of the page
		$ = cheerio.load(content, {
			normalizeWhitespace: true});
		 
		var yearEvents = [] 

		var yearEventsObject = $('#mw-content-text').children("ul"); 
		yearEventsObject.each(function(index, monthUL){
			$(this).children().each(function (childIndex, entry){
				yearEvents.push($(this).text());
			});

		})


		console.log(yearEvents)
		

	})


}


scrapePage("https://en.wikipedia.org/wiki/1956")

