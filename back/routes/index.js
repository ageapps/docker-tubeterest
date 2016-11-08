const express = require('express');
const router = express.Router();
var userController;
var sessionController;
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});

router.get('/test', function(req, res, next) {
    const favourites = ["fFF2Yup2dMM", "3KP36218LVw", "iJ9hS54BRag"];
    res.json(favourites);
});


router.connect = function() {
    console.log("Models SetUp");
    userController = require('../controllers/user_controller.js');
    sessionController = require('../controllers/session_controller.js');

    router.get('/DBtest', function(req, res, next) {
        const favourites = ["fFF2Yup2dMM", "3KP36218LVw", "iJ9hS54BRag"];
        res.json(favourites);
    });
    router.post("/login", userController.login);
    router.get("/favorites", sessionController.loginRequired, userController.favorites);
    router.post("/addFav", sessionController.loginRequired, userController.addFav);
    router.post("/removeFav", sessionController.loginRequired, userController.removeFav);
};

module.exports = router;
