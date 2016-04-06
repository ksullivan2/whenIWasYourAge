var createCheerio = require('./scraper').createCheerio;
var EventModel = require('./database').EventModel;
var Promise = require('bluebird');
//selects which century
var before60thCenturyRE = /^(([2-5][0-9]))/;


//li with parent ul with parent li == event (parent li is year)

// div id=mw-content-text > ul === each century
  // > li === year
  // > li === text

  // score=1000??

var wikiaUrl = 'http://scifi.wikia.com/wiki/Timeline_of_fictional_future_events';


function scrapeFuture (url){
  if(!url) url = wikiaUrl;
  return createCheerio(url, 0)
    .then(function ($) {
      var events = [];
      // console.log($)
      //parse year events
      //each ul is a century
      $('#mw-content-text').children('ul').each(function(){
        // console.log('hi', $(this).prev('h2').text())
        var bef60Cent = $(this).prev('h2').text().match(before60thCenturyRE)!==null;
        if(bef60Cent) {
          $(this).children('li').each(function(){
            //$this is li with year and ul of events
            var year = $(this).contents().get(0).data;
              // if (year) console.log(year, year.length);
              //only take events with a year and only a single year not a range
            if (year && year.length < 7){
              $(this).find('li').each(function(){
                //$this is event bullet
                var text = $(this).text();
                events.push({year, text});
              });
            }
          });
        }
      });
      // console.log(events)
      return events;
    });

}

// scrapeFuture()

function loadFurure(url){
  return scrapeFuture(url)
    .then(function(events){
      return Promise.map(events, function(eventObj){
        return EventModel.create({
          text: eventObj.text,
          year: parseInt(eventObj.year, 10),
          score: 1000,
          links: ''
        }); 
      });
    })
    .then(function(writtenEvents){
      console.log('wrote', writtenEvents.length, 'events');
    }).catch(function(err){
      console.error('problem scraping future', err.message.slice(0, 100));
    });
}

// function eventsToCSV(eventsArr){

// }

module.exports = loadFurure;




