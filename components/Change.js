var React = require('react');

var bcRE = /bc/i;


var Change = React.createClass({
    getInitialState: function(){
    	return {name: '', birthYear:'', endYear:''};
    },

    handleNameChange: function(e){
    	this.setState({name: e.target.value});
    },

    handleBirthYearChange: function(e){
    	this.setState({birthYear: e.target.value});
    },

    handleEndYearChange: function(e){
    	this.setState({endYear: e.target.value});
    },

    handleSubmit:function(e){
    	e.preventDefault();
        var birthYear = parseYear(this.state.birthYear);
    	var endYear = 2016;
    	if (this.state.endYear){
    		var endYear = parseYear(this.state.endYear);
    	} 
        if (endYear<=birthYear) endYear = birthYear+1;
    	this.props.changeInfo(this.state.name, birthYear, endYear);
    	this.setState({
    		name: '', birthYear:'', endYear:''
    	})

    },

  render: function () {
    return (
      <div id='Change'>
      <form id="changeForm" onSubmit={this.handleSubmit}>
        <input id = "nameField"
        	required 
        	type="text" 
        	placeholder="Name*"
        	value={this.state.name}
        	onChange={this.handleNameChange} />
        <input id="birthYearField" 
        	required 
        	type="text" 
        	placeholder="Birth Year*"
        	value = {this.state.birthYear}
        	onChange = {this.handleBirthYearChange} />
        <input id="endYearField" 
        	type="text" 
        	placeholder="End Year"
        	value = {this.state.endYear}
        	onChange = {this.handleEndYearChange} />
        <input type="submit" />
        </form>
      </div>
    )
  }
});

function parseYear(yearStr){
  var bc = yearStr.search(bcRE);
  var year;
  if(bc>-1){
    year = 0 - parseInt(yearStr, 10);
  } else year = Number(yearStr);
  if(isNaN(year)) year = 1900;
  return year;
}

module.exports = Change;


