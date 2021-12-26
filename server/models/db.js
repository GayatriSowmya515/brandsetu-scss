const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, (err) => { // connect to mongodb database using mongoose 
    if (!err) { console.log('MongoDB connection succeeded.'); }
    else { console.log('Error in MongoDB connection : ' + JSON.stringify(err, undefined, 2)); }
});

require('./user.model'); 