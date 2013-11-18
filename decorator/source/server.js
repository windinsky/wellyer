#!/usr/bin/env node
var http = require('http'),
	port = process.argv.slice(2),
	fs = require('fs'),
	api = require('./config/api.json'),
	cluster = require('cluster'),
	numCPUs = require('os').cpus().length;

welly = require('welly');

welly.set('views', __dirname + '/views/');
welly.set('controllers', __dirname + '/controllers/sale.com/');
welly.set('api', api.path);

fs.createWriteStream(__dirname+"/config/pids", {
	flags: "a+",
	encoding: "utf-8",
	mode: 0666
}).write(process.pid + "\n");



if (cluster.isMaster) {
  // Fork workers.
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', function(worker, code, signal) {
    console.log('worker ' + worker.process.pid + ' died');
  });
} else {
  // Workers can share any TCP connection
  // In this case its a HTTP server
  http.createServer(function(req, res) {
    welly.process(req,res);
  }).listen(port[0]);
}