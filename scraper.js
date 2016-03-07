var cheerio = require('cheerio');
var rp = require('request-promise');

function scrapePage(url){
	//rp says "once this is done, do the .then function"
	return createCheerio(url)

	//once that loads in...
	.then(function($){

		 
		var yearEvents = [] 

		var yearEventsObject = $('#mw-content-text').children("ul"); 
		yearEventsObject.each(function(){
			$(this).children().each(function (){
				var eventObject ={
					text: $(this).text(),
					links: [],
					score: 0
				}

				$(this).children("a").each(function(){
					eventObject.links.push($(this).attr("href"));
					console.log($(this).attr("href"))
				})

				yearEvents.push()
			});

		})
		//console.log(yearEvents);
		return yearEvents;
	})
	
}

function createCheerio(url){
	//rp says "once this is done, do the .then function"
	return rp(url)

	//once that loads in...
	.then(function(content){

		//$ refers to the full loaded content of the page
		$ = cheerio.load(content, {
			normalizeWhitespace: true});

		return $
	})
}


function whatLinksHere(url){
	return createCheerio(url)
	.then(function($){


		var titleOfPage = url.slice(30);
		
		var whatLinksHereURL = ("https://en.wikipedia.org/w/index.php?title=Special:WhatLinksHere/" 
								+ titleOfPage + "&limit=5000");

		return createCheerio(whatLinksHereURL)
		.then(function($){
			var counter = 0;

			$("#mw-whatlinkshere-list li a").each(function(){

				var title = $(this).attr('title');
				if (title && title.slice(0,7) != "List of" && title.indexOf(":") == -1 && $(this).text() != "edit"){
					console.log(title)
					counter ++;
				}
			})

			return counter;
		})
	})
}

//var test = whatLinksHere("https://en.wikipedia.org/wiki/Mary_Martin")
/*test.then(function(results){
	console.log(results)
})*/
scrapePage("https://en.wikipedia.org/wiki/1956")

