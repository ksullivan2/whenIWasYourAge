var React = require('react');


var Sentence = React.createClass({
  render: function () {
    return (
    <div id="Sentence">
      <h2>In {this.props.selectedYear}, when {this.props.name} was {this.props.age}:</h2>
      </div>
    )
  }
});

module.exports = Sentence;


