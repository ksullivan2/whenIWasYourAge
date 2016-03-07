var cheerio = require('cheerio');
var rp = require('request-promise');
var Promise = require('bluebird');


//var monthNames = [January, February, March, April, May, June, July, August, September, October, November, December]
var monthNamesRE = /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
var yearRE = /^\d{4}$/;
var siteRE = /\.org\//

//returns yearEvents Arr with promises for scores
function createYearEvents(url){
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
					var linkTitle = $(this).attr("title")
			
					if (linkTitle && linkTitle.search(monthNamesRE) === -1 && linkTitle.search(yearRE) === -1){
						// console.log(linkTitle)
						// console.log(linkTitle.search(yearRE))
						var href = $(this).attr("href");
						if(href.search(siteRE) === -1) {
							href = 'https://en.wikipedia.org' + href;
							eventObject.links.push(href);
						} 
						
					}
				})
				eventObject.score = Promise.reduce(eventObject.links, function(sumScores, link){
					return whatLinksHere(link)
					.then(function(linkScore){
						return sumScores + linkScore;
					}) 
				})

				yearEvents.push(eventObject)
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
					// console.log(title)
					counter ++;
				}
			})
			console.log('resolving', titleOfPage, counter)
			return counter;
		})
	})
}

//var test = whatLinksHere("https://en.wikipedia.org/wiki/Mary_Martin")
/*test.then(function(results){
	console.log(results)
})*/
createYearEvents("https://en.wikipedia.org/wiki/1156").then(function(arrProm){
	console.log('before all', arrProm)
	

	return Promise.all(arrProm).then(function(arr){
		console.log(arr)
		var sorted = arr.sort(function(a, b){
			return a.score - b.score;
		})
		console.log('after', sorted)
	})
})

