const express = require('express');
const cors = require('cors');

const https = require('https');
const http = require('http');

const fs = require('fs');
const routes = require('./api');

const app = express();
app.use(cors());

// force redirect from HTTP to HTTPS
app.enable('trust proxy');
app.use(function(request, response, next) {
  if (process.env.NODE_ENV != 'development' && !request.secure) {
     return response.redirect("https://" + request.headers.host + request.url);
  }
  next();
})

// Listen both http & https ports
const httpServer = http.createServer(app);
const httpsServer = https.createServer({
  key: fs.readFileSync('/etc/letsencrypt/live/tiszuk.com/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/tiszuk.com/fullchain.pem'),
}, app);

httpServer.listen(80, () => {
    console.log('HTTP Server running on port 80');
});

httpsServer.listen(443, () => {
    console.log('HTTPS Server running on port 443');
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// www.domain.com/api/tasks
app.use(routes);

// serve the frontend from the 'public' folder (react's 'build' folder)
app.use(express.static('public'));
