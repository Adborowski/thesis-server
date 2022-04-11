const connectToDatabase = () => {
  require("dotenv").config();
  const mongoose = require("mongoose");

  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  mongoose
    .connect(process.env.DB, connectionParams)
    .then(() => console.log(`Database connected successfully`))
    .catch((err) => console.log(err));

  mongoose.Promise = global.Promise;
  const db = mongoose.connection;
  return db;
};

module.exports = connectToDatabase;
