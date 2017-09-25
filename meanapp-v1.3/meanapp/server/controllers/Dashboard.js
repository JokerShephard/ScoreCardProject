
var Resource = require('resourcejs');
module.exports = function(app, route) {

  // Setup the controller for REST;
  Resource(app, '', route, app.models.Audit).rest({

    // Add a before handler to include filter and parent information.
    before: function(req, res, next) {
      req.body.parent = req.params.parentId;
      req.modelQuery = this.model.where('parent', req.params.parentId);
      next();
    }
  });

  // Return middleware.
  return function(req, res, next) {
    next();
  };
};
