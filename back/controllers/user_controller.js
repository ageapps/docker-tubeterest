var models = require('../models');

var sendUser = function(res, user, id) {
    res.status(200);
    if (id) {
        res.json({
            user: user,
            id: id
        });
    } else {
        res.json(user);
    }
};
var sendError = function(res, msg) {
    res.status(500);
    res.send(msg);
};

// GET /favorites
exports.favorites = function(req, res, next) {
    res.status(200);
    res.json(req.session.user.favorites);
};

exports.login = function(req, res, next) {
    var userName = req.param("username");
    console.log(userName);
    if (userName) {
        checkUser(userName, function(user) {
            if (user) { // user allready logged in
                console.log("USER EXISTS");
                req.session.user = user;
                // OK....
                sendUser(res, user);
            } else { // register new user
                console.log("REGISTER USER");
                createUser(userName, function(user) {
                    if (user) {
                        req.session.user = user;
                        // OK....
                        sendUser(res, user);
                    } else {
                        // error
                        sendError(res, "Error Creating User");
                    }
                });
            }
        });
    }

};

exports.addFav = function(req, res, next) {
    toggleFav(true, req, res);
}
exports.removeFav = function(req, res, next) {
    toggleFav(false, req, res);
}


var checkUser = function(username, cb) {
    models.User.findByName(username, function(err, user) {
        if (user) {
            cb(user);
        } else {
            cb(null);
        }
    });
};

var createUser = function(userName, cb) {
    var newUser = new models.User({
        name: userName,
        favorites: []
    });
    newUser.save(function(err, user) {
        if (err) {
            console.error(err);
            cb(null);
        } else {
            console.log(user.name + " -> SAVED");
            cb(user);
        }
    });
};

var toggleFav = function(add, req, res) {
    var fav = req.param("id");
    if (fav) {
        var userName = req.session.user.name;
        checkUser(userName, function(foundUser) {
            if (foundUser) {
                foundUser.addFavorite(add, fav, function(err, user, id) {
                    if (!err && user) {
                        // user saved
                        sendUser(res, user,id);
                    } else {
                        // error
                        sendError(res, "Error Adding Favorite");
                    }
                });
            } else {
                sendError(res, "Error User Not Found");
            }
        });
    } else {
        sendError(res, "Error Wrong Parameter");
    }
}
