var DATABASE = process.env.DATABASE || 'wheniwasyourage';
var USERNAME = process.env.DB_USERNAME || 'chandragalbiati';
var Sequelize = require('sequelize');

var seq = new Sequelize(DATABASE, USERNAME, "", {
  host: 'localhost',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  define: {
    freezeTableName: true,
    underscored: true,
    underscoredAll: true
  }
});

seq
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  }, function (err) { 
    console.log('Unable to connect to the database:', err);
  });

var Event = seq.define('event', {
  text: Sequelize.TEXT,
  year: Sequelize.INTEGER,
  score: Sequelize.INTEGER,
  links: Sequelize.TEXT //space delineated string
});

//starts database
// seq.sync()

module.exports = {
  seq: seq,
  EventModel: Event
};