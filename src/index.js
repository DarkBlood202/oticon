const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();
// mongoose.connect('');

// Settings
app.set('port', process.env.PORT || 5000);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/test', require('./routes/test'));

// Static
app.use(express.static(path.join(__dirname, 'public')));

// Serve
app.listen(app.get('port'), ()=>{
    console.log("Server on port", app.get('port'));
})