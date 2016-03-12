var React = require('react');

var BirthYear = require('./BirthYear');
var EndYear = require('./EndYear');

var Slider = React.createClass({
  render: function () {
    return (
      <div id='Slider'>
        Slider
        <BirthYear />
        <EndYear />
      </div>
    )
  }
});

module.exports = Slider;


