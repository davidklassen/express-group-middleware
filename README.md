express-group-middleware
========================
Если вам надо повесить авторизацию на группу путей, можете воспользоваться этой библиотечкой

Работает например так:
```javascript
var group = require('express-group-middleware')(app);
var auth = function (req, res, next) { 
  // do some auth...
  next(); 
};

group(function () {
  app.resource('channels', channels, { load: Channel.findById.bind(Channel) });
  app.resource('streams', streams, { load: Stream.findById.bind(Stream) });
  app.resource('workers', workers);
}).before(auth);
```
