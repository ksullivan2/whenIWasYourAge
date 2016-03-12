var React = require('react');
var ReactDOM = require('react-dom');
var Fact1 = require('./Fact1');
var Fact2 = require('./Fact2');
var Fact3 = require('./Fact3');
var Fact4 = require('./Fact4');
var Information = require('./Information');

var App = React.createClass({
  render: function () {
    return (
      <div id='App'>
        App
        <Fact1 />
        <Fact2 />
        <Fact3 />
        <Fact4 />
        <Information />
      </div>
    )
  }
});

module.exports = App;

ReactDOM.render(<App />, document.getElementById('main-container'));
