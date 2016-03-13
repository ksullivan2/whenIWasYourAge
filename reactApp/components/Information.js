var React = require('react');

var Slider = require('./Slider');
var Change = require('./Change');
var Name = require('./Name');

var Information = React.createClass({
  getInitialState: function(){
    return{
      name:"Tom",
      birthYear: "1956",
      endYear: "2016"
    }
  },

  changeInfo: function(name, birthYear,endYear){
    this.setState({
      name: name,
      birthYear: birthYear,
      endYear: endYear
    });
  },

  render: function () {
    return (
      <div id='Information'>
        Information
        <Slider birthYear={this.state.birthYear} endYear={this.state.endYear}/>
        <Change changeInfo={this.changeInfo}/>
        <Name name={this.state.name}/>
      </div>
    )
  }
});

module.exports = Information;


