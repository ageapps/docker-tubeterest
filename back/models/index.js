'use strict';

var app = require('../app');
var userSchema = require('./user')(app.mongoose);


// find user by name
userSchema.methods.addFavorite = function(adding, fav, cb) {
    var id = fav;
    var saved = false; // check if fav has to be saved
    if (adding) {
        this.favorites.push(fav);
        saved = true;
    } else {
        const index = this.favorites.indexOf(fav); // index of fav
        if (index >= 0) {
            this.favorites.splice(index, 1); // delete just that element
            saved = true;
        }
    }
    if (saved) {
        this.save(function(err, user) {
            return cb(err, user, id);
        });
    } else {
        return cb(id);
    }

};

// find user by name
userSchema.statics.findByName = function(name, cb) {
    return this.findOne({
        name: name
    }, cb);
};


var User = app.mongoose.model('User', userSchema);

exports.User = User;
