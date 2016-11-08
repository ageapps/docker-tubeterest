exports.loginRequired = function(req, res, next) {
    if (req.session.user) {
        next();
    } else {
      res.status(403);
      res.send("You are not logged in");
    }
};
