var React = require('react');

var Slider = require('./Slider');
var Change = require('./Change');
var Sentence = require('./Name');

var Information = React.createClass({
  getInitialState: function(){
    return{
      name:"Tom",
      birthYear: "1956",
      endYear: "2016",
      selectedYear: "1972",
      age: 16
    }
  },

  changeInfo: function(name, birthYear,endYear){
    this.setState({
      name: name,
      birthYear: birthYear,
      endYear: endYear
    });
  },

  changeYear: function(year){
    this.setState( {
      selectedYear: year,
      age: parseInt(year)- parseInt(this.state.birthYear)
    });
  },

  render: function () {
    return (
      <div id='Information'>
        Information
        <Slider birthYear={this.state.birthYear} endYear={this.state.endYear} changeYear={this.changeYear}/>
        <Change changeInfo={this.changeInfo}/>
        <Sentence name={this.state.name} selectedYear={this.state.selectedYear} age={this.state.age}/>
      </div>
    )
  }
});

module.exports = Information;


