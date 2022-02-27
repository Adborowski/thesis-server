// Congratulations! Your certificate and chain have been saved at:
//    /etc/letsencrypt/live/tiszuk.com/fullchain.pem
//    Your key file has been saved at:
//    /etc/letsencrypt/live/tiszuk.com/privkey.pem

const express = require('express');
const cors = require('cors');

const https = require('https');
const http = require('http');

const fs = require('fs');


const app = express();
app.use(cors());
app.use(express.static('public'));

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