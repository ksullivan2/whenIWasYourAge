var React = require('react');


var BirthYear = React.createClass({
  render: function () {
    return (
    <div id="BirthYear">
      <p>{this.props.birthYear}</p>
      </div>
    )
  }
});

module.exports = BirthYear;


