var express = require('express');
var app = express();
var http = require('http').Server(app);
var seq = require('./database').seq;
var EventModel = require('./database').EventModel;
var scrapeYear = require('./scraper');
var testYear = "https://en.wikipedia.org/wiki/1156";
var wikiPrefix = 'https://en.wikipedia.org/wiki/';
var Promise = require('bluebird');

app.use(express.static("public"));


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.post('/year/:year', function(req, res){
  return scrapeYear(wikiPrefix+req.params.year)
  .then(function(eventsArr){
    return Promise.all(eventsArr, function(promEventObj){
      return promEventObj.then(function(eventObj){
        return EventModel.create({
          text: eventsArr.text,
          year: parseInt(req.params.year, 10),
          score: eventsArr.score,
          links: eventsArr.links.join(' ')
        });
      });
    });
    console.log('got events', eventsArr);
  });
});

app.get('/post/year/:year', function(req, res){
  console.log('matched req to', req.params.year)
  return scrapeYear(wikiPrefix+req.params.year)
  .then(function(eventsArr){
    // console.log('received promise for eventsArr', eventsArr)
    return Promise.map(eventsArr, function(eventObj){
      console.log('eventObj', eventObj);
      return EventModel.create({
          text: eventObj.text,
          year: parseInt(req.params.year, 10),
          score: eventObj.score,
          links: eventObj.links.join(' ')
        });
    });
  }).then(function(finEventsArr){
      console.log('got events', finEventsArr);
      res.send(finEventsArr);
    });
});

seq.sync({force:true})
.then(function(){
  http.listen(process.env.PORT || 5000, function(){
    console.log('listening on *:5000');
  });
});


