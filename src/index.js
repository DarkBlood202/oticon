const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');

const connectionString = "mongodb+srv://dber:dber@oticon.tahsk.mongodb.net/oticon?retryWrites=true&w=majority";

const app = express();

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
})
    .then(db => console.log("Connected to database."))
    .catch(err => console.error(err));

// Settings
app.set('port', process.env.PORT || 5000);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/productos', require('./routes/productos'));

// Static
app.use(express.static(path.join(__dirname, 'public')));

// Serve
app.listen(app.get('port'), ()=>{
    console.log("Server on port", app.get('port'));
})