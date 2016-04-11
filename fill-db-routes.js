var express = require('express');
var router = express.Router();
var scrapeYear = require('./scraper');
var addDataForYear = require('./load-data').scrapeDataForYear;
var addDataForRange = require('./load-data').scrapeDataForRange;
var scrapeFuture = require('./scrape-future');
//makes BC years work
var bcRE = /bc/i;


//mock post reqs bc I was lazy and wanted to load through the browser

//scrapes for and writes to db events for one year
router.get('/year/:year', function(req, res){
  year = parseYear(req.params.year);
  res.send('making request to scrape events in ' + year);
  return addDataForYear(year);
});

//scrapes for and writes to db events for a range of years
//not quite restfull but easilly understandable and replicable
router.get('/range/:min/:max', function(req, res){
  var min = parseYear(req.params.min);
  var max = parseYear(req.params.max);
  res.send('making request for ' + min + '-' + max);
  return addDataForRange(parseInt(min, 10), parseInt(max, 10));
});

//scrapes for and writes db events for future from scifi wikia
router.get('/future', function(req, res){
  console.log('scraping future')
  res.send('scraping future');
  return scrapeFuture();
});

// router.post('/api/year/:year', function(req, res){
//   var year = parseYear(req.params.year);
//   res.send('making request for ' + year);
//   return addDataForYear(parseInt(year));
// });

function parseYear(yearStr){
  var bc = yearStr.search(bcRE);
  var year;
  if(bc>-1){
    year = 0 - parseInt(yearStr, 10);
  } else year = Number(yearStr);
  if(isNaN(year)) year = 1900;
  return year.toString();
}

module.exports = router;