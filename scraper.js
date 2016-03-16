var cheerio = require('cheerio');
var rp = require('request-promise');
var Promise = require('bluebird');


var monthNamesRE = /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
var yearRE = /^\d{4}$/;
var siteRE = /\.org\//;

//returns yearEvents Arr with promises for yearEvents
function createYearEvents(url){
	
	return createCheerio(url)

	.then(function($){

		/* STRUCTURE OF DATA ON PAGE:
			this=ul (list of events)
				this = li (event)
					this = a (link to something in event)
		*/


		//create an array to return at the end, will have "eventObjects"
		var yearEvents = [];

		//grab all of the uls on the page and create list of events from within them
		var yearEventsULs = $('#mw-content-text').children("ul");


		
		//for each event on the page, return a promise for the eventObject
		yearEventsULs.each(function(){
			var ulTitle = $(this).prev('h2').children('.mw-headline').attr('id')
			// var ulTitle = $(this).prev('h2').children()[0].attr('id'); 
			console.log('title', ulTitle)

			//loop through each ul to find child li's (find will find nested??)
			//within each LI, create an eventObject with text, links, and score
			$(this).find('li').each(function (){
				//the full text of the event
				var text = $(this).text();
				if (ulTitle === 'Births') text = 'Birth: ' + text;
				else if (ulTitle === 'Deaths') text = 'Death: ' + text;

				//grab an array of all the links within the li
				var links = [];

				$(this).children("a").each(function(){
					var linkTitle = $(this).attr("title")

					//filter out dates/years
					if (linkTitle && linkTitle.search(monthNamesRE) === -1 && linkTitle.search(yearRE) === -1){
						
					// console.log('found title', linkTitle)
						var href = $(this).attr("href");

						//filter out non-wikipedia links and add the prefix to the valid ones
						if(href.search(siteRE) === -1) {
							href = 'https://en.wikipedia.org' + href;
							// console.log('pushing link href', href)
							links.push(href);
						} 
					}		
				});

				//score is a promise for the score
				//represents the avergage number of pages that link to relevant words in the event
				var score = Promise.reduce(links, function(sumScores, link){
					// console.log('reducing', link, sumScores)
					return whatLinksHere(link)
					.then(function(linkScore){
						// console.log('linkscore', linkScore)
						return sumScores + linkScore;
					}).then(function(sum){
						// console.log('added scores to get', sum, 'for', text);
						return sum/links.length;
					});
				}, 0)
				.catch(function(err){
					console.error('error in creating calculating score', err.message);
					return 0;
				});


				//create promise for eventObject once all scores resolve
				var promEventObj = score.then(function(score){
					console.log('calculated score', score, text.slice(0,100));
					return Promise.resolve({
						text: text,
						links: links,
						score: score
					});
				});

				//push each promEventObj to the returned array
				//we don't resolve this before returning
				yearEvents.push(promEventObj);
			});

		});
		//console.log(yearEvents);
		return yearEvents;
	});	
}






function createCheerio(url, again){
	// console.log('making req for', url)
	//rp says "once this is done, do the .then function"
	return rp(url)

	//once that loads in...
	.then(function(content){

		//$ refers to the full loaded content of the page
		$ = cheerio.load(content, {
			normalizeWhitespace: true});

		return $;
	}).catch(function(err){
		console.error('error in creating cheerio obj for', url, 'again?', again, err.message.slice(0,1000));
		if(!again) return createCheerio(url, true);
	});
}


function whatLinksHere(url){
	return createCheerio(url)
	.then(function($){


		var titleOfPage = url.slice(30);
		
		var whatLinksHereURL = ("https://en.wikipedia.org/w/index.php?title=Special:WhatLinksHere/" 
								+ titleOfPage + "&limit=5000");

		return createCheerio(whatLinksHereURL)
	})
	.then(function($){
			var counter = 0;

			$("#mw-whatlinkshere-list li a").each(function(){

				var title = $(this).attr('title');
				if (title && title.slice(0,7) != "List of" && title.indexOf(":") == -1 && $(this).text() != "edit"){
					// console.log(title)
					counter ++;
				}
			});
			// console.log('resolving', titleOfPage, counter)
			return counter;
		})
	.catch(function(err){
		console.error('error in counting links', err.message);
		return 0;
	});
}



//var test = whatLinksHere("https://en.wikipedia.org/wiki/Mary_Martin")
/*test.then(function(results){
	console.log(results)
})*/

// //returns array of events for a given year with ranks resolved
// function resolveYearEvents(url){
// 	return createYearEvents(url).then(function(arrProm){
// 		// console.log('before all', arrProm)
		

// 		return Promise.all(arrProm).then(function(arr){
// 			console.log('returned arr with ranks', arr);
// 			return arr;
// 			// var sorted = arr.sort(function(a, b){
// 			// 	return a.score - b.score;
// 			// })
// 			// console.log('after', sorted)
// 		});
// 	});

// }

module.exports = createYearEvents;


