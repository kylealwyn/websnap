const express = require('express')

const app = express();
const indexPath = `${__dirname}/build/index.html`;
const publicPath = express.static(`${__dirname}/build/assets`);

app.use('/assets', publicPath);
app.get('/*', function (_, res) { res.sendFile(indexPath) });

app.listen(process.env.PORT || 4000);

module.exports = app;
