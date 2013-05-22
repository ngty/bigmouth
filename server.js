var restify = require('restify');
var app = restify.createServer();
var config = require('./lib/config');
var log = require('./lib/log')
var speak = require('./lib/speak');


function handle(req, res, callback){
  speak(req.params.voice, req.params.text, function(e){
    if(e) res.send(500, e.message);
    else res.send(200);
    next();
  })
};


app.use(restify.urlEncodedBodyParser());

app.put('/:voice/speak', function(req, res, next){
  handle(req, res, next);
});

app.put('/speak', function(req, res, next){
  req.params.voice = undefined
  handle(req, res, next);
});

app.get('/:voice/ping', function(req, res, next){
  req.params.text = "u ping i pong !!";
  handle(req, res, next);
});

app.get('/ping', function(req, res, next){
  req.params.voice = undefined
  req.params.text = "u ping i pong !!";
  handle(req, res, next);
});


app.listen(config.public.port, function() {
  log("bigmouth", "info", "listening at " + app.url);
});
