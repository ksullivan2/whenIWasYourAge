var React = require('react');


var Sentence = React.createClass({
  render: function () {
    return (
    <div id="Name">
      <p>In {this.props.selectedYear}, when {this.props.name} was {this.props.age}...</p>
      </div>
    )
  }
});

module.exports = Sentence;


