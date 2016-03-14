var React = require('react');
var Fact = require('./Fact');
var EventsList = require('./EventsList');



var FactList = React.createClass({
  getInitialState: function(){
   
    var year = this.props.selectedYear;
    return{
      events: EventsList[year]
    }
  },




  render: function () {
    var year = this.props.selectedYear
  
      var listItems = this.state.events.map(function(event){
        return <Fact eventText={event} year={year}/>;
      });
    return (
      <div id="FactList" > 
        {listItems}
      </div>
    )
  }
});

module.exports = FactList;


