var spawn = require('child_process').spawn;
var log = require('./log')
var server = spawn('festival', ['--server']);

server.stdout.on('data', function(data){
  log('festival', 'info', data);
});

server.stderr.on('data', function(data){
  log('festival', 'error', data);
});

module.exports = server;
