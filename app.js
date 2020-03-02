const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const db = mongoose.connect(`${process.env.MONGODB_PATH}:${process.env.MONGODB_PORT}/${process.env.MONGODB_NAME}`, { "useNewUrlParser": true, "useUnifiedTopology": true });
const port = process.env.PORT || 3000;

const Event = require('./models/eventModel');
const eventRouter = require('./routes/eventRouter')(Event);

const PageView = require('./models/pageViewModel');
const pageViewRouter = require('./routes/pageViewRouter')(PageView);

const Browser = require('./models/browserModel');
const browserRouter = require('./routes/browserRouter')(Browser);

const Country = require('./models/countryModel');
const countryRouter = require('./routes/countryRouter')(Country);

const User = require('./models/userModel');
const userRateRouter = require('./routes/userRateRouter')(User);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', eventRouter);
app.use('/api', pageViewRouter);
app.use('/api', browserRouter);
app.use('/api', countryRouter);
app.use('/api', userRateRouter);

app.get('/', (req, res) => {
    res.send('Welcome!');
});

app.listen(port, () => {
    console.log(`Running on ${port}`);
});
