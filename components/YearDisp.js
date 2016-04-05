var React = require('react');


var YearDisplay = React.createClass({
  render: function () {
    return (
    <div className="yearDisplay" id={this.props.id}>
      <h2>{this.props.year}</h2>
      </div>
    )
  }
});


module.exports = YearDisplay;



