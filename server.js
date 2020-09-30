const express = require("express");
const app  = express();
const cors = require("cors");
const routers = require('./routers/index');
const connectDB = require('./helpers/db/connectDB');
require('dotenv').config({path: "./config/env/config.env"});
const customErrorHandler = require('./middlewares/errors/customErrorHandler');
connectDB();

const PORT = process.env.PORT;

app.use(cors());
// Express - Body Middleware
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server Çalışıyor. Port:${process.env.PORT} Mode:${process.env.NODE_ENV}`);
});

app.use('/api', routers);

app.use(customErrorHandler);