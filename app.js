const express = require('express');
const helmet = require('helmet');

const app = express();

prefix = '/ps';

app.use(prefix, express.static('public'));
app.listen(3003);

