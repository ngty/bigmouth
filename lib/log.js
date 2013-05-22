var dateformat = require('dateformat');

module.exports = function(service, type, msg){
  console[type]("%s | %s > %s",
    dateformat().toString(), service.toUpperCase(),
    msg.toString(). // fix festival's log format
      split(/\w{3} \w{3} \d{2} \d{2}:\d{2}:\d{2} \d{4} : /).join('').
      split(/server\s+Festival server/).join('').trim()
  );
};
