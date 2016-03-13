var React = require('react');


var Name = React.createClass({
  render: function () {
    return (
    <div id="Name">
      <p>{this.props.name}</p>
      </div>
    )
  }
});

module.exports = Name;


