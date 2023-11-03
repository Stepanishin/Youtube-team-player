const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://evgeniistepanishin:Rtyuehe74@cluster0.haz86tn.mongodb.net/evgeniistepanishin?retryWrites=true&w=majority&ssl=true",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
