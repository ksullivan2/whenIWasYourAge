var React = require('react');


var Fact = React.createClass({
  render: function () {
    return (
      <li className="Fact" >
        {this.props.eventText}
        
      </li>
    )
  }
});

module.exports = Fact;


