var React = require('react');
var ReactDOM = require('react-dom');
var FactList = require('./FactList');
var Change = require('./Change.js');
var Information = require('./Information');
var $ = require('jquery');

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
      name:"Mocha",
      birthYear: "1900",
      endYear: "1902",
      selectedYear: '1901',
      events: null
  	};
  },

  componentDidMount: function(){
    this.setState(
      {events: this.getEventsForTimeline(this.state.birthYear, this.state.endYear)})

  },

  getEventsForTimeline: function(birthYear, endYear){
    console.log("getEventsForTimeline")
    var url = "/api/range?min="+birthYear+"&max="+endYear+"&perYear=5";

    $.ajax({
      url: url,
      success: function(data){return data},
      error: function(err){console.log(err)}
    });

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
    var defaultAge = Math.floor((endYear - birthYear)/2)
    this.props.changeYear( parseInt(birthYear)+defaultAge);

    this.setState({
      name: name,
      birthYear: birthYear,
      endYear: endYear,
      age: defaultAge,
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
          // events={this.state.events} 
          />
      </div>
    )
  }
});

module.exports = App;

ReactDOM.render(<App />, document.getElementById('main-container'));
