var React = require('react');
var Fact = require('./Fact');
var EventsList = require('./EventsList');



var FactList = React.createClass({

  render: function () {
    console.log("inside factlist", this.props.events)

    var year = this.props.selectedYear;  
    

    if (this.props.events){
      
      var listItems = this.props.events[this.props.selectedYear].map(function(event){
          return <Fact eventText={event.text} />;
        });
      return (
        <div id="FactList" >
        
          {listItems}
          
        </div>
      )
    } else{
      return( <div id="FactList"> LOADING </div>)
    }


  }
});

module.exports = FactList;


