const express = require("express");
const cors = require("cors");
const app = express();

app.set('port', process.env.PORT || '0.0.0.0');
app.set('host', process.env.HOST || '0.0.0.0');

app.use(cors());

app.use(express.json());

const v_api = '/api/v-1';

app.use(`${v_api}`, require("./routes/cliente"));
// app.use(`${v_api}/producto`, require("./routes/producto"));
// app.use(`${v_api}/usuario`, require("./routes/usuario"));

module.exports = app;