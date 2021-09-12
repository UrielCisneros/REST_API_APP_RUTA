const express = require("express");
const cors = require("cors");
const app = express();

app.set('port', process.env.PORT || '0.0.0.0');
app.set('host', process.env.HOST || '0.0.0.0');

app.use(cors());

app.use(express.json());

const v_api = '/api/v-1';

app.use(`${v_api}/almacenes`, require("./routes/almacenes.routes"));
app.use(`${v_api}/compras`, require("./routes/compras.routes"));
app.use(`${v_api}/empresas`, require("./routes/empresas.routes"));
app.use(`${v_api}/pago-comiciones`, require("./routes/pago_comisiones.routes"));
app.use(`${v_api}/productos`, require("./routes/productos.routes"));
app.use(`${v_api}/proveedores`, require("./routes/proveedor.routes"));
app.use(`${v_api}/usuarios`, require("./routes/usuarios.routes"));
app.use(`${v_api}/ventas`, require("./routes/ventas.routes"));
app.use(`${v_api}/login`, require("./routes/login.routes"));

module.exports = app;