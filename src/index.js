const express = require('express');
const app = express();

const PORT = process.env.PORT || 8000;
const BACKEND_LINK = `localhost:${PORT}`;

const dotenv = require('dotenv');
dotenv.config({ Path: "../.env" });

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const cors = require('cors');
app.use(cors({
    origin: ['https://demo-erp-frontend.onrender.com', 'http://localhost:5173'],
    credentials: true
}));

app.use(express.static('frontend/dist'));
app.use(express.json());

app.use(require('./Router/router'));
require("./db/conn");

app.listen(PORT, () => {
    console.log(`Listening to port number ${PORT}, Running on ${BACKEND_LINK}`);
});
