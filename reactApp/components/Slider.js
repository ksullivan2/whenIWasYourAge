var React = require('react');
var YearDisplay = require('./YearDisplay');


var Slider = React.createClass({
	getInitialState: function(){
		return {
			selectedYear: parseInt(this.props.birthYear) + 16,
			age: 16
		}
	},

	handleChange: function(e){
		this.setState( {
			selectedYear: e.target.value,
			age: parseInt(e.target.value) - parseInt(this.props.birthYear)
		});
	},

  render: function () {

    return (
      <div id='Slider'>
        <YearDisplay id="selectedYear" year={this.state.selectedYear} />
        <YearDisplay id="BirthYear" year={this.props.birthYear} />
        <div id="yearSliderDIV">
	        <input id="yearSlider"
	        	type="range" 
	        	defaultValue="16" 
	        	min= {this.props.birthYear}
	        	max= {this.props.endYear}
	        	onChange= {this.handleChange}/>
	       </div>
        <YearDisplay id="EndYear" year={this.props.endYear} />
        <YearDisplay id="Age" year={this.state.age} />

      </div>
    )
  }
});

module.exports = Slider;


