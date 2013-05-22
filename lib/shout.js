var say = require("say");

module.exports = function(speaker, text){
  if(!speaker) speaker = "John";
  console.log("%s speaking: %s", speaker, text);
}

