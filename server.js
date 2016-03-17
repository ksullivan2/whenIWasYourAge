'use strict'

var express = require('express');
var app = express();
var http = require('http').Server(app);
var seq = require('./database').seq;
var EventModel = require('./database').EventModel;
var scrapeYear = require('./scraper');
var addDataForYear = require('./load-data').scrapeDataForYear;
var addDataForRange = require('./load-data').scrapeDataForRange;
var Promise = require('bluebird');
var PORT = process.env.PORT || 5000;
// var PORT = 3000

var sequelize = require('sequelize');

app.use(express.static(__dirname+"/public/"));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

//gets events from a year
app.get('/api/year/:year', function(req, res){
  return EventModel.findAll({
    attributes: ['text', 'score', 'year'],
    where: {
      year: parseInt(req.params.year)
    }
  }).then(function(events){
    return res.send(events);
  });
});

//query strings will be in the format: ?min=__&max=__&perYear=__
app.get('/api/range', function(req, res){
  var min = parseInt(req.query.min);
  var max = parseInt(req.query.max);
  var perYear = req.query.perYear || 3;
  var queryString = buildRanngeQuery(min, max, perYear);
  //query database to get first perYear events from each year between min and max
   return seq.query(queryString, { type: sequelize.QueryTypes.SELECT})
  .then(function(events) {
    return res.send(events);
  }).catch(function(err){
    console.error('error getting events in range', err);
  });
});

//scrapes for and writes to db events for one year
app.get('/api/post/year/:year', function(req, res){
  res.send('making request to scrape events in ' + req.params.year);
  return addDataForYear(req.params.year);
});

//scrapes for and writes to db events for a range of years
//not quite restfull but easilly understandable and replicable
app.get('/api/post/range/:min/:max', function(req, res){
  res.send('making request for ' + req.params.min + '-' + req.params.max);
  return addDataForRange(parseInt(req.params.min, 10), parseInt(req.params.max, 10));
});

app.post('/api/year/:year', function(req, res){
  res.send('making request for ' + req.params.year);
  return addDataForYear(parseInt(req.params.year));
});

//connect to db and start server
//one of the seq.sync statements should always be commented out.  The first resets the db, and the second does not
// seq.sync({force:true})
seq.sync()
.then(function(){
  http.listen(PORT, function(){
    console.log('listening on', PORT);
  });
});

module.exports = {
  PORT: PORT
};

function buildRanngeQuery(min, max, limit){
  var queryString = '';
  for(var year = min; year<=max; year++){
    queryString += "(select year, score, text from event where year = '"+year+"' order by score desc limit "+limit+") ";
    if (year<max) queryString += "union all ";
  }
  return queryString;
}


//queries that work:
// select
//     x1.year
//     , x1.score
// from event as x1
// where
//     (
//     select count(*)
//     from event as x2
//     where x2.year = x1.year
//     and x2.score >= x1.score
//     ) <= 2
// order by year, score;

// (select year, score, text from event where year = '1969' order by score desc limit 2)
// union all
// (select year, score, text from event where year = '1970' order by score desc limit 2)
// union all
// (select year, score, text from event where year = '1971' order by score desc limit 2)
// union all
// (select year, score, text from event where year = '1973' order by score desc limit 2);
