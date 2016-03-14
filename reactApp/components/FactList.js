var React = require('react');
var Fact = require('./Fact');
var EventsList = require('./EventsList');



var FactList = React.createClass({

  render: function () {
    var year = this.props.selectedYear;  
    var listItems = EventsList[year].map(function(event){
        return <Fact eventText={event} />;
      });
    return (
      <div id="FactList" >
      
        {listItems}
        
      </div>
    )
  }
});

module.exports = FactList;


