var React = require('react');
var ReactDOM = require('react-dom');
var FactList = require('./FactList');
var Change = require('./Change.js');

var Information = require('./Information');

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
      name:"Tom",
      birthYear: "1956",
      endYear: "2016",
      selectedYear: '1976'
  	};
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
          // events={this.state.events} />
      </div>
    )
  }
});

module.exports = App;

ReactDOM.render(<App />, document.getElementById('main-container'));
