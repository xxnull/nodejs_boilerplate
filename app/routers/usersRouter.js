module.exports = function(router, User) {

    router.use(function(req, res, next) {
        console.log('Pet App executed');
        next();
    });
    
    router.get('/', function(req, res) {
        res.json({ message: 'Pet App Welcome Users Router' });
    });

    router.route('/users')

        .post(function(req, res){
            
            var user = new User({
                name: req.body.name,
                username: req.body.username,
                password: req.body.password
            });
           
            user.save(function(err){
                if(err){
                    res.send(err);
                }else{
                    
                    res.json({ message: user});
                }
            });
            
        })

        .get(function(req, res){
            User.find(function(err, users){
                if(err){
                    res.send(err);
                }else{
                    res.json(users);
                }
            });
        });

    router.route('/users/:user_id')

        .get(function(req, res){
            User.findById(req.params.user_id, function(err, user){
                if(err){
                    res.send(err);
                }else{
                    res.json(user);
                }
            });
        })
    
        .put(function(req, res){
            User.findById(req.params.user_id, function(err, user){
                if(err){
                    res.send(err);
                }else{
                    user.name = req.body.name;

                    user.save(function(err){
                        if(err){
                            res.send(err);
                        }else{
                            res.json(user);
                        }
                    });
                }
            });
        })

        .delete(function(req, res){
            User.remove(
                { _id: req.params.user_id}, function(err, user){
                    if(err){
                        res.send(err);
                    }else{
                        res.json({message: 'User Deleted!'});
                    }
                });
        });
};
