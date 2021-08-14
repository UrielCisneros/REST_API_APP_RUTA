const express = require("express");
const cors = require("cors");
const app = express();

app.set('port', process.env.PORT || '0.0.0.0');
app.set('host', process.env.HOST || '0.0.0.0');

app.use(cors());

app.use(express.json());

app.use('/api/v-1/', () => {

});

module.exports = app;