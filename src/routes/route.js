const express = require('express');
const pcmsRouter = express.Router();
const https = require('https');
const { HttpsProxyAgent } = require('https-proxy-agent');


const proxyUrl = 'http://192.183.99.101:3128';      // Define the proxy server
const proxyAgent = new HttpsProxyAgent(proxyUrl);   // Create an instance of the proxy agent


// Define the options for the HTTP request
// const options = {
//   host: 'www.example.com',
//   port: 80,
//   path: '/',
//   agent: agent
// };

module.exports = proxyUrl;
module.exports = proxyAgent;
