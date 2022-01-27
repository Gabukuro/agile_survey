require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

const teamController = require('./app/controller/teamController');
const userController = require('./app/controller/userController');

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use('/user', userController);
app.use('/team', teamController);

app.listen(3000, () => {
    console.log(`Client has been stated at: http://localhost:${3000}`);
})