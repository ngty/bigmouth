var _ = require('lodash');
var spawn = require('child_process').spawn;
var config = require('./config');
var log = require('./log')
var server = spawn('festival', ['--server']);
var client;


function trim(msg){
  return msg.toString().
    split(/\w{3} \w{3} \d{2} \d{2}:\d{2}:\d{2} \d{4} : /).join('').
    split(/server\s+Festival server/).join('').trim();
}


server.stdout.on('data', function(data){
  log('festival', 'info', trim(data));
});

server.stderr.on('data', function(data){
  log('festival', 'error', trim(data));
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

