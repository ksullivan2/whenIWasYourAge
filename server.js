var express = require('express');
var app = express();
var http = require('http').Server(app);
var seq = require('./database').seq;
var EventModel = require('./database').EventModel;
var scrapeYear = require('./scraper');
var testYear = "https://en.wikipedia.org/wiki/1156";
var wikiPrefix = 'https://en.wikipedia.org/wiki/';
var Promise = require('bluebird');
// var path = require('path');

// app.use(express.static(path.join(__dirname, './../')));
app.use(express.static(__dirname+"/public/"));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.post('/api/year/:year', function(req, res){
  console.log('matched req to', req.params.year)
  return scrapeYear(wikiPrefix+req.params.year)
  .then(function(eventsArr){
    res.send(eventsArr);
    // console.log('received promise for eventsArr', eventsArr)
      console.log('found', eventsArr.length, 'events');
    return Promise.map(eventsArr, function(eventObj){
      return EventModel.create({
          text: eventObj.text,
          year: parseInt(req.params.year, 10),
          score: eventObj.score,
          links: eventObj.links.join(' ')
        });
    }).catch(function(err){
      console.error('error in mapping events arr promises', err);
      return [];
    });
  })
  .then(function(finEventsArr){
      console.log('got events', finEventsArr.length);
      // res.send(finEventsArr);
  })
  .catch(function(err){
    console.log('error somewhere??', err);
  });
});

app.get('/api/range', function(req, res){
  
})

app.get('/post/year/:year', function(req, res){
  console.log('matched req to', req.params.year)
  return scrapeYear(wikiPrefix+req.params.year)
  .then(function(eventsArr){
    res.send(eventsArr)
    // console.log('received promise for eventsArr', eventsArr)
      console.log('found', eventsArr.length, 'events');
    return Promise.map(eventsArr, function(eventObj){
      return EventModel.create({
          text: eventObj.text,
          year: parseInt(req.params.year, 10),
          score: eventObj.score,
          links: eventObj.links.join(' ')
        });
    }).catch(function(err){
      console.error('error in mapping events arr promises', err);
      return [];
    });
  })
  .then(function(finEventsArr){
      console.log('got events', finEventsArr.length);
      // res.send(finEventsArr);
  })
  .catch(function(err){
    console.log('error somewhere??', err);
  });
});

seq.sync()
.then(function(){
  http.listen(process.env.PORT || 5000, function(){
    console.log('listening on *:5000');
  });
});


