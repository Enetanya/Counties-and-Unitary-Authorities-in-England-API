const dotenv = require('dotenv');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const mainMiddleware = require('./main');
const changeMiddleware = require('./changeLoginDetails');
const authMiddleware = require('./authenticationJsonToken');

dotenv.config();

// Creates a write stream (in append mode)
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

// Used Morgan for logging HTTP requests to the file
app.use(morgan('combined', { stream: accessLogStream }));




// View engine setup
app.set('view engine', 'pug');
app.set('views', './views');

// Middleware setup
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());




// Apply authentication middleware
app.use('/auth',authMiddleware);

//Use route to change login details
app.use('/forgot',changeMiddleware);


//Use route for main API
app.use('/main',mainMiddleware);





// Start the server
app.listen(3000, function() { console.log('Server is running on port 3000'); });



 module.exports = app; // export the app 


