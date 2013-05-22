var _ = require('lodash');
var spawn = require('child_process').spawn;
var config = require('./config');
var log = require('./log')
var server = spawn('festival', ['--server']);
var client;


server.stdout.on('data', function(data){
  log('festival', 'info', data);
});

server.stderr.on('data', function(data){
  log('festival', 'error', data);
});


module.exports = function(args, callback){
  if(!client) client = spawn('festival_client', ['--async']);

  var chosen = args.voice;
  var say = "(SayText \"" + (args.msg || 'W.T.F') + "\")";
  var cmds;

  if(chosen === '_all') {
    cmds = _.map(config.voices, function(val, key){
      return "(voice_" + val + ")\n" + say;
    });
  } else if(config.voices[chosen]){
    cmds = ["(voice_" + config.voices[chosen] + ")\n" + say];
  } else {
    cmds = ["(voice_reset)\n" + say];
  };

  client.stdin.write(cmds.join("\n") + "\n", callback);
};

