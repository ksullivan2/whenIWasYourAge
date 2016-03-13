var React = require('react');

var BirthYear = require('./BirthYear');
var EndYear = require('./EndYear');

var Slider = React.createClass({

	getInitialState: function(){
		return{
			birthYear: this.props.birthYear,
			endYear: this.props.endYear
		}
	},

  render: function () {
    return (
      <div id='Slider'>
        Slider
        <BirthYear birthYear={this.state.birthYear} />
        <EndYear endYear={this.state.endYear} />
      </div>
    )
  }
});

module.exports = Slider;


