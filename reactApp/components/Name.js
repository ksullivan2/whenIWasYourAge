var React = require('react');


var Name = React.createClass({
  render: function () {
    return (
    <div id="Name">
      <p>When {this.props.name} was...</p>
      </div>
    )
  }
});

module.exports = Name;


