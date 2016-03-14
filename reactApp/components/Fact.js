var React = require('react');


var Fact = React.createClass({
  render: function () {
    return (
      <div className="Fact" >
        {this.props.eventText}
        <br / >
        I know the year is {this.props.year}
      </div>
    )
  }
});

module.exports = Fact;


