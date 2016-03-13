var React = require('react');


var Change = React.createClass({
  render: function () {
    return (
      <div id='Change'>
      <form id="changeForm">
        <input type="text" placeholder="Name" />
        <input type="text" placeholder="Birth Year" />
        <input type="text" placeholder="End Year" />
        <input type="submit" />
        </form>
      </div>
    )
  }
});

module.exports = Change;


