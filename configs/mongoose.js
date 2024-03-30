// Import mongoose module
const mongoose = require('mongoose');

// MongoDB connection URI
const uri = "mongodb+srv://vkakhil:vishnucnt@cluster0.kslyn8z.mongodb.net/vishnuCnt";

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    const connection = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`Connected to MongoDB successfully on host: ${connection.connection.host}`.bgGreen.white);
  } catch (err) {
    console.error(`Error connecting to MongoDB: ${err.message}`.bgWhite.red);
    process.exit(1); // Exit the application in case of an error
  }
};

module.exports = connectDB;
