var React = require('react');

var Slider = require('./Slider');
var Change = require('./Change');
var Name = require('./Name');

var Information = React.createClass({
  render: function () {
    return (
      <div id='Information'>
        Information
        <Slider />
        <Change />
        <Name />
      </div>
    )
  }
});

module.exports = Information;


