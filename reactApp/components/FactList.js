var React = require('react');
var Fact = require('./Fact');
var EventsList = require('./EventsList');



var FactList = React.createClass({
  getInitialState: function(){
    return{
      events: EventsList.evens
    }
  },




  render: function () {
      var listItems = this.state.events.map(function(event){
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


