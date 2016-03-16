'use strict';

var scrapeYear = require('./scraper');
var Promise = require('bluebird');
var wikiPrefix = 'https://en.wikipedia.org/wiki/';
var EventModel = require('./database').EventModel;
var yearRE = /^\d{4}$/;


function scrapeDataForYear(year){
  if (year.toString().search(yearRE) === -1) {
    console.error('scraping something wrong', year);
    return [];
  }
  console.log(year)
  return scrapeYear(wikiPrefix+year)
  .then(function(eventsArr){
      console.log('found', eventsArr.length, 'events');
    return Promise.map(eventsArr, function(eventObj){
      return EventModel.create({
          text: eventObj.text,
          year: parseInt(year, 10),
          score: eventObj.score,
          links: eventObj.links.join(' ')
        });
    }).catch(function(err){
      console.error('error in mapping events arr promises', err.message.slice(0,1000));
      return [];
    });
  })
  .then(function(finEventsArr){
      console.log('got events', finEventsArr.length);
      return finEventsArr;
  })
  .catch(function(err){
    console.error('error somewhere in scrapeDataForYear', err.message.slice(0,1000));
    return [];
  });
}

//fires off all requests at once
//might be too many
function scrapeDataForRangeAllAtOnce(min, max){
  var yearsArr = Array.apply(null, Array(max-min+1)).map(function (_, i) {return i + min;});
  console.log(yearsArr)
  return Promise.map(yearsArr, function(year){
    return scrapeDataForYear(year);
  })
  .then(function(returnArr){
    console.log('wrote events for', returnArr.length, 'years');
  })
  .catch(function(err){
    console.error('error in scaping for range', err.message.slice(0,1000));
  });
}

//only fires off requests for one year at a time
function scrapeDataForRangeSerial(min, max){
  var yearsArr = Array.apply(null, Array(max-min+1)).map(function (_, i) {return i + min;});
  // console.log(yearsArr)
  return Promise.each(yearsArr, function(year){
    // console.log(year)
    // return Promise.resolve(year)
    return scrapeDataForYear(year);
  })
  .then(function(returnArr){
    console.log('wrote events for', returnArr.length, 'years');
  })
  .catch(function(err){
    console.error('error in scaping for range', err.message.slice(0,1000));
  });
}


module.exports = {
  scrapeDataForYear: scrapeDataForYear,
  scrapeDataForRange: scrapeDataForRangeSerial
};
