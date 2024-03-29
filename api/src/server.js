'use strict'
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('../config');
const userRoutes = require('./routes/userRoutes');
const charityRoutes = require('./routes/charityRoutes');

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use('/api', userRoutes.routes);
app.use('/api', charityRoutes.routes);

app.listen(config.port, () => console.log('App is listening on url'+ config.url));
