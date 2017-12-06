module.exports = function(router, User, jwt, app) {
    router.post('/authenticate',function(req, res) {
        User.findOne({ name: req.body.name }, function(err, user){
            
            if(err) throw err;

            if(!user){
                res.json({success: false, message: 'Authentication failed, wrong password!'});
            }else{
                if(user.password != req.body.password){
                    res.json({success: false, message: 'Authentication failed, wrong password!'});
                }else{
                    const payload = {
                        admin: user.admin 
                    };

                    var token = jwt.sign(payload, app.get('superSecret'), {
                        expiresIn: 1440
                    });

                    res.json({
                        success: true,
                        message: 'Enjoy your token!',
                        token: token
                    });
                }
            }
            
        });
    });   
};
