var jwt = require('jsonwebtoken');

module.exports = function handlelogin(app, route) {

    app.post('/login', function(req, res) {

      //searching the user in the DB
        app.models.User.findOne({
            Name: req.body.username
        }, function(err, user) {

            if (err) throw err;
            console.log('user is ' + user);
            if (!user) { //could not find a user
                res.json({
                    success: false,
                    message: 'Authentication failed. User not found.'
                });
            } else if (user) { // if the user is found in the DB, check the password.

                // check if password matches
                if (user.Password != req.body.password) {
                    res.json({
                        success: false,
                        message: 'Authentication failed. Wrong password.',

                    });
                } else {

                    // if user is found and password is right
                    // create a token
                    var token = jwt.sign(user, 'shhhhh');

                    // return the information including token as JSON
                    res.json({
                        success: true,
                        message: 'A new token has been assigned',
                        token: token,
                        user: user
                    });
                }
            }
        });
    });

    return function(req, res, next) {
        next();
    };
}
