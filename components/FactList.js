var React = require('react');
var Fact = require('./Fact');
// var EventsList = require('./EventsList');
var Loader = require('./Loading');



var FactList = React.createClass({

  render: function () {
    console.log("inside factlist", this.props.events)

    var year = this.props.selectedYear;  
    

    if (this.props.events){

      if(this.props.events[this.props.selectedYear]){
      
      var listItems = this.props.events[this.props.selectedYear].map(function(event, idx){
          return <Fact eventText={event.text} key={idx}/>;
        });
    } else listItems = [<Fact eventText='Sorry, no events for this year :(' key='1'/>]
      return (
        <div id="FactList" >
          <ul>
          {listItems}
          </ul>
        </div>
      )
    } else{
      return( <div id="FactList"> <Loader/> </div>)
    }


  }
});

module.exports = FactList;


