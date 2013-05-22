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


module.exports = function(chosen, text, callback){
  if(!client) client = spawn('festival_client', ['--async']);

  var voices = config.voices;
  var say = "(SayText \"" + (text || 'W.T.F') + "\")";
  var cmds = [];

  if(chosen === '_all') {
    _.each(voices, function(val, key){
      cmds.push(["(voice_" + val + ")", say]);
    });
  } else if(voices[chosen]){
    cmds.push(["(voice_" + voices[chosen] + ")", say]);
  } else {
    cmds.push(["(voice_reset)", say]);
  };

  cmds.push("");
  cmds = _.flatten(cmds);

  log('festival', 'info', 'processing: ' + JSON.stringify(cmds));
  client.stdin.write(cmds.join("\n"), callback);
};

