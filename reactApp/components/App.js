var React = require('react');
var ReactDOM = require('react-dom');
var FactList = require('./FactList');

var Information = require('./Information');

var App = React.createClass({
  render: function () {
    return (
      <div id='App'>
        
        <Information />
        <FactList />
      </div>
    )
  }
});

module.exports = App;

ReactDOM.render(<App />, document.getElementById('main-container'));
