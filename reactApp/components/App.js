var React = require('react');
var ReactDOM = require('react-dom');
var FactList = require('./FactList');

var Information = require('./Information');

var App = React.createClass({
  getInitialState: function(){
  	return{
  		selectedYear: "1972"
  	}
  },

  changeYear: function(year){
  	this.setState({
  		selectedYear: year
  	})
  },



  render: function () {
    return (
      <div id='App'>
        
        <Information selectedYear={this.state.selectedYear} changeYear={this.changeYear}/>
        <FactList selectedYear={this.state.selectedYear} />
      </div>
    )
  }
});

module.exports = App;

ReactDOM.render(<App />, document.getElementById('main-container'));
