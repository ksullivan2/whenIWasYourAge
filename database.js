var DATABASE = process.env.DATABASE_NAME || 'wheniwasyourage';
var USERNAME = process.env.DB_USERNAME || 'kaleysullivan';
var PASSWORD = process.env.DB_PASSWORD || "";
var Sequelize = require('sequelize');

// postgres://[username]:[password]@[host]:[port]/[databaseName]
// postgres://ifudimhkmajrvj:0zRVFq2uknpRlLxxAMngohjLaC@ec2-54-83-59-203.compute-1.amazonaws.com:5432/d2u2h5u9avhsrs

var seq = new Sequelize(DATABASE, USERNAME, PASSWORD, {
  host: process.env.DB_HOST ||'localhost',
  //COMMENT OUT PORT LINE if this doesn't work on local machine, it's not needed for local
  port: process.env.DB_PORT || 5432,
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
},{
indexes: [
  {
    name: 'multi_collumn',
    fields: ['year', 'score'],
  },
   {
      name: 'btree_index',
      method: 'BTREE',
      fields: ['year', {attribute: 'score', order: 'DESC', length: 5}]
  }]
});

//starts database
// seq.sync()

module.exports = {
  seq: seq,
  EventModel: Event
};