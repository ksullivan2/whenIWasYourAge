var React = require('react');

var Slider = require('./Slider');
var Change = require('./Change');
var Sentence = require('./Sentence');


//info receives props:
// {changeYear, name, birthYear, endYear, age}
var Information = React.createClass({
  

  render: function () {
    var age = this.props.selectedYear - this.props.birthYear;

    return (
      <div id='Information'>
        <h1>When I Was Your Age...</h1>
        
        <Slider 
          selectedYear={this.props.selectedYear}
          birthYear={this.props.birthYear} 
          endYear={this.props.endYear} 
          changeYear={this.props.changeYear}/>
        <Sentence 
          name={this.props.name} 
          selectedYear={this.props.selectedYear} 
          age={age}/>
        
      </div>
    )
  }
});

module.exports = Information;


