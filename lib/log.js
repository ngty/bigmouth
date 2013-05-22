var dateformat = require('dateformat');

module.exports = function(service, type, msg){
  console[type]("%s | %s > %s",
    dateformat().toString(), service.toUpperCase(),
    msg
  );
};
