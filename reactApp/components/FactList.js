var React = require('react');
var Fact = require('./Fact');



var FactList = React.createClass({
  render: function () {
    return (
      <div id="FactList" > 
        <Fact />
        <Fact />
        <Fact />
        <Fact />


      </div>
    )
  }
});

module.exports = FactList;


