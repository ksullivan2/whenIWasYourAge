var React = require('react');
var YearDisplay = require('./YearDisplay');


var Slider = React.createClass({
	

	handleChange: function(e){
		this.props.changeYear(e.target.value)
	},

  render: function () {

    return (
      <div id='Slider'>
        
        <YearDisplay id="BirthYear" year={this.props.birthYear} />
        <div id="yearSliderDIV">
	        <input id="yearSlider"
	        	type="range" 
	        	value={this.props.selectedYear}
	        	min= {this.props.birthYear}
	        	max= {this.props.endYear}
	        	onChange= {this.handleChange}/>
	       </div>
        <YearDisplay id="EndYear" year={this.props.endYear} />
       
      </div>
    )
  }
});

module.exports = Slider;


