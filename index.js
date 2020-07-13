/*Requireing all the dependencies for the module */
const env = require('dotenv');
const express = require('express');


/*Making ready to use */
env.config();
const app = express();


/* Making other modules ready to use */
require('./data_spitters/login')(app);


/*Start the server */
app.listen(process.env.port || 5000 , console.log(`App started at ${process.env.port || 5000}`) );

