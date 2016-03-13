var React = require('react');

var BirthYear = require('./BirthYear');
var EndYear = require('./EndYear');

var Slider = React.createClass({


  render: function () {
  	var sliderLength = (this.props.endYear-this.props.birthYear);

    return (
      <div id='Slider'>
        <BirthYear birthYear={this.props.birthYear} />
        <div id="yearSliderDIV">
	        <input id="yearSlider"
	        	type="range" 
	        	defaultValue="16" 
	        	min= "0"
	        	max= {sliderLength}/>
	       </div>
        <EndYear endYear={this.props.endYear} />
      </div>
    )
  }
});

module.exports = Slider;


