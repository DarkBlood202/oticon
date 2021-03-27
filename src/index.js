const express = require('express');
const path = require('path');
const morgan = require('morgan');

// Inits
const app = express();
require('./database');

// Settings
app.set('port', process.env.PORT || 5000);
app.set('views', path.join(__dirname, "views"));
app.set('view engine', 'ejs');

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api', require('./routes/productos'));
app.use('/uploads', require('./routes/uploads'));
app.use('/buscar', require('./routes/busquedas'));
app.use('/faq', require('./routes/faq'));
app.use('/reportes', require('./routes/reportes'));
app.use('/', require('./routes/routes'));

// Static
app.use(express.static(path.join(__dirname, 'public')));

// Serve
app.listen(app.get('port'), ()=>{
    console.log("Server on port", app.get('port'));
})