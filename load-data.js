'use strict';

var scrapeYear = require('./scraper').createYearEvents;
var calcScore = require('./scraper').calcScore;
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
  .then(function(eventsArrNoScores){
    // console.log('got back events from scraper', eventsArrNoScores)
    var slicedArr = [];
    do { 
      var sliceEnd = eventsArrNoScores.length<400 ? eventsArrNoScores.length : 400;
      slicedArr.push(eventsArrNoScores.splice(0, sliceEnd));
    } while (eventsArrNoScores.length>400);
    // console.log(slicedArr)
    return Promise.each(slicedArr, function(arrSlice){
      console.log('going through slices', arrSlice.length)
      //return arr with promises for eventObjs
      return Promise.map(arrSlice, function(eventObj){
        // console.log('eventObj', eventObj)
          eventObj.score = calcScore(eventObj.links);
          return eventObj;
      })
      .then(function(eventsArr){
          console.log('found', eventsArr.length, 'events');
        return Promise.map(eventsArr, function(eventObj){
          return eventObj.score.then(function(score){
              return EventModel.create({
                text: eventObj.text,
                year: parseInt(year, 10),
                score: score,
                links: eventObj.links.join(' ')
              });       
          });
        }).catch(function(err){
          console.error('error in mapping events arr promises', err.message.slice(0,1000));
          return [];
        });
      });
    }).then(function(finEventsArr){
        console.log('got events from slice', finEventsArr.length);
        return finEventsArr;
    });
  })
  .then(function(finEventsArr){
      console.log('got events from all slices', finEventsArr.length);
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
    console.log(year)
    // return Promise.resolve(year)
    return scrapeDataForYear(year);
  })
  .then(function(returnArr){
    console.log('wrote events for', returnArr.length, 'years');
    return returnArr;
  })
  .catch(function(err){
    console.error('error in scaping for range', err.message.slice(0,1000));
  });
}


module.exports = {
  scrapeDataForYear: scrapeDataForYear,
  scrapeDataForRange: scrapeDataForRangeSerial
};
