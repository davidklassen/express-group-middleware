/**
 * Add middleware to the group of paths.
 */

'use strict';

module.exports = function (app) {
  return function (group) {
    return new Group(app, group);
  }
};

function Group(app, fn) {
  var oldRoutes = {};
  this.groupRoutes = [];

  // save routes that are already registered
  for (var method in app.routes) {
    if (Object.prototype.hasOwnProperty.call(app.routes, method)) {
      oldRoutes[method] = [];

      app.routes[method].forEach(function (route) {
        oldRoutes[method].push(route);
      });
    }
  }

  // add passed routes
  fn();

  // get new routes
  for (var method in app.routes) {
    if (Object.prototype.hasOwnProperty.call(app.routes, method)) {
      oldRoutes[method] = oldRoutes[method] || [];

      app.routes[method].forEach(function (route) {
        if (!~oldRoutes[method].indexOf(route)) {
          this.groupRoutes.push(route);
        }
      }, this);
    }
  }
}

Group.prototype.before = function (middleware) {
  if (!(middleware instanceof Array)) {
    middleware = [middleware];
  }

  this.groupRoutes.forEach(function (route) {
    route.callbacks = middleware.concat(route.callbacks);
  });

  return this;
};
