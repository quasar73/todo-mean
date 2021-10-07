const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const keys = require('./config/keys');

const authRoutes = require('./routes/auth');
const listRoutes = require('./routes/list');
const itemRoutes = require('./routes/item');

const app = express();

mongoose.connect(keys.mongoURI)
    .then(() => console.log('Connected to MongoDB!'))
    .catch(err => console.log(err));

app.use(passport.initialize());
require('./middleware/passport')(passport);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/list', listRoutes);
app.use('/api/item', itemRoutes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/dist/client'));
  
    app.get('*', (req, res) => {
        res.sendFile(
            path.resolve(
                __dirname, 'client', 'dist', 'client', 'index.html'
            )
        );
    });
}

module.exports = app;