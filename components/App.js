var React = require('react');
var ReactDOM = require('react-dom');
var FactList = require('./FactList');
var Change = require('./Change.js');
var Information = require('./Information');
var $ = require('jquery');

var bcRE = /bc/i;


/*
base structure for this.state
{
name: ,
start:Num,
end: Num,
selectedYear: num,
eventsList: {year:[{event},{event}]}

events from db: [{year, text, score}]
*/

var App = React.createClass({
  getInitialState: function(){
  	return {
      name:"Obama",
      birthYear: "1961",
      endYear: "2016",
      selectedYear: "1983",
      events: null
  	};
  },

  componentDidMount: function(){
    this.getEventsForTimeline(this.state.birthYear, this.state.endYear);
  },

  getEventsForTimeline: function(birthYear, endYear){
    var self = this;
    var url = "/api/range?min="+birthYear+"&max="+endYear+"&perYear=5";

    $.ajax({
      url: url,
      success: self.setEventsData,
      error: function(err){console.log(err)}
    });
  },

  setEventsData: function(data){
    var eventsList = {};
    data.forEach(function(event){
      if (eventsList[event.year]){
        eventsList[event.year].push(event);
      } else {
        eventsList[event.year] = [event];
      }
    });

    this.setState({events: eventsList});
  },

  getMoreEvents: function(year){
    var self = this;
    var url = "/api/year/"+year;

    $.ajax({
      url: url,
      success: self.setSomeAddlEvents,
      error: function(err){console.log(err);}
    });
  },

  //sets all data to events year
  setAddlEvents: function(data){
    var year = data[0].year;
    var newEvents = Object.assign({}, this.state.events);
    newEvents[year] = data;
    this.setState({events: newEvents});
  },

  //sets 20 random data events to year
  setSomeAddlEvents: function(data){
    if(data.length === 0) return;
    var year = data[0].year;
    var newEvents = Object.assign({}, this.state.events);
    var randIndexes = new Set();
    var nextIdx;
    while (randIndexes.size<20) {
      nextIdx = randInRange(data.length);
      if(!randIndexes.has(nextIdx)) randIndexes.add(nextIdx);
    }
    var randEvents = [];
    randIndexes.forEach(function(idx){
      randEvents.push(data[idx]);
    });
    newEvents[year] = randEvents;
    this.setState({events: newEvents});
  },

  //changes slider selected year
  //fires when slider is moved
  changeYear: function(year){
  	this.setState({
  		selectedYear: year
  	});
  },

  //fires when form is submitted
  changeInfo: function(name, birthYear,endYear){
    var defaultSelectedYear = Math.floor((endYear - birthYear)/2)+ parseInt(birthYear);
    this.getEventsForTimeline(birthYear,endYear);

    this.setState({
      name: name,
      birthYear: birthYear,
      endYear: endYear,
      selectedYear: defaultSelectedYear,
    });
  },


  render: function () {
    return (
      <div id='App'>
        <Change 
          changeInfo={this.changeInfo}/>
        <Information 
          selectedYear={this.state.selectedYear} 
          name={this.state.name} 
          birthYear={this.state.birthYear} 
          endYear={this.state.endYear} 
          changeYear={this.changeYear} />
        <FactList 
          selectedYear={this.state.selectedYear}
          events={this.state.events} 
          getMoreEvents={this.getMoreEvents}
          />
      </div>
    )
  }
});

//returns a random number between 0 and max(exclusive)
function randInRange(max){
  return Math.floor(Math.random()*max);
}

module.exports = App;

ReactDOM.render(<App />, document.getElementById('main-container'));
