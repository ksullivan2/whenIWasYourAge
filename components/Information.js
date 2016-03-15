var React = require('react');

var Slider = require('./Slider');
var Change = require('./Change');
var Sentence = require('./Sentence');

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
    this.props.changeYear( parseInt(birthYear)+16);

    this.setState({
      name: name,
      birthYear: birthYear,
      endYear: endYear,
      age: 16,
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
          changeYear={this.changeYear}/>
        <Change 
          changeInfo={this.changeInfo}/>
        <Sentence 
          name={this.state.name} 
          selectedYear={this.props.selectedYear} 
          age={this.state.age}/>
      </div>
    )
  }
});

module.exports = Information;


