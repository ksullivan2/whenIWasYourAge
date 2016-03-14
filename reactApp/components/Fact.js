var React = require('react');


var Fact = React.createClass({
  render: function () {
    return (
      <div className="Fact" >
        {this.props.eventText}
      </div>
    )
  }
});

module.exports = Fact;


