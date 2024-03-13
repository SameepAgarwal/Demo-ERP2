
var mongoose = require('mongoose');
//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/my_database';
var mongoDB = 'mongodb+srv://sameepagarwal232:ofpoUVSD3i2ndFwe@cluster0.8opani4.mongodb.net/general_erp?retryWrites=true&w=majority';
mongoose.connect(mongoDB, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
}).then(() => {
    console.log("Connection with DB is successful");
}).catch((error) => {
    console.error(`Error connecting to Mongo DB ${error}`);
});
//Get the default connection
// var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));