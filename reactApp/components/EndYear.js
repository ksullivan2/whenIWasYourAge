var React = require('react');


var EndYear = React.createClass({
  render: function () {
    return (
    	<div id="EndYear">
      <p>{this.props.endYear}</p>
      </div>
    )
  }
});

module.exports = EndYear;


