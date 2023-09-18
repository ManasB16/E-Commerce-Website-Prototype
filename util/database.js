// Using Sequelize
// const Sequelize = require("sequelize");

// const sequelize = new Sequelize("node-complete", "root", "MySql1600", {
//   dialect: "mysql",
//   host: "localhost",
// });

// module.exports = sequelize;

// Using MongoDB

const mongodb = require("mongodb");
const mongoclient = mongodb.MongoClient;
const url =
  "mongodb+srv://manas16:6HKXMOFNRzUZCIz3@cluster0.h49tqzu.mongodb.net/shop?retryWrites=true&w=majority";

let _db;

const mongoConnect = (callback) => {
  mongoclient
    .connect(url)
    .then((client) => {
      console.log("Connected");
      _db = client.db();
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database found";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
