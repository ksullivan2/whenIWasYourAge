var React = require('react');

var Slider = require('./Slider');
var Change = require('./Change');
var Sentence = require('./Sentence');


//info receives props:
// {changeYear, name, birthYear, endYear, age}
var Information = React.createClass({
  getInitialState: function(){
    return{
      name:"Tom",
      birthYear: "1956",
      endYear: "2016",
      age: 16
    }
  },

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

  changeYear: function(year){
    this.props.changeYear(year);

    this.setState( {
      age: parseInt(year)- parseInt(this.state.birthYear)
    });
  },

  render: function () {
    return (
      <div id='Information'>
        Information
        <Slider 
          selectedYear={this.props.selectedYear}
          birthYear={this.state.birthYear} 
          endYear={this.state.endYear} 
          changeYear={this.props.changeYear}/>
        <Sentence 
          name={this.state.name} 
          selectedYear={this.props.selectedYear} 
          age={this.state.age}/>
      </div>
    )
  }
});

module.exports = Information;


