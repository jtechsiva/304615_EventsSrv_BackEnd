const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');
const User = mongoose.model('User');

var ObjectId = mongoose.Types.ObjectId;

module.exports.addUser = (req, res, next) => {
   var user = new User();
   user.firstName = req.body.firstName;
   user.lastName = req.body.lastName;
   user.displayName = req.body.displayName;
   user.email = req.body.email;
   user.password = req.body.password;   
   user.role = "Normal";   
   user.userStatus = "Active";   
   user.save((err, doc) => {
        if(!err)
           res.send(doc);        
        else{
            if(err.code === 11000)
               res.status(422).send(["Duplicate email address found."]);
            else 
               return next(err);          
        }
   });
}

module.exports.authenticate = (req, res, next) => {
    // call for passport authentication
    passport.authenticate('local', (err, user, info) => {
        // error from passport autheticate
        if(err) return res.status(400).json(err);
        // registered user
        else if(user) return res.status(200).json({"token": user.generateJwt()});
        // unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res);
}

module.exports.getUsers = (req, res) => {
    User.find(function (err, userData) {               
        if (err) 
            console.log('Error in Retriving Users: ' + JSON.stringify(err, undefined, 2));
        else 
            res.send(userData);
    });  
}

module.exports.getUser = (req, res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('No user record found with given id: ' + req.params.id);
    else {
        User.findById(req.params.id, function (err, userData) {               
            if (err) 
                console.log('Error in Retriving User: ' + JSON.stringify(err, undefined, 2));
            else 
                res.send(userData);
        });
    }  
}

module.exports.userProfile = (req, res, next) => {
    User.findOne({_id: req._id}, 
        (err, user) => {
            if(!user)
                return res.status(404).json({status: false, messgae: 'User record not found.'});
            else
                return res.status(200).json({ status: true, user: _.pick(user, ['displayName', 'email', 'empId', 'role'])});
        }
    )
}

module.exports.deleteUser = (req, res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('No user record found with given id: ' + req.params.id);
    else
        User.findByIdAndRemove(req.params.id,  (err, user) => {
                if(!err)
                    return res.send(user);
                else
                    return console.log('Error in User delete: ' + JSON.stringify(err, undefined, 2) );
            }
        )
}

module.exports.updateUser = (req, res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('No user record found with given id: ' + req.params.id);
    else
        var user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            displayName: req.body.displayName,
            email: req.body.email,
            role: req.body.role,
            userStatus: req.body.userStatus
        };

    User.findByIdAndUpdate(req.params.id, {$set: user}, {new: true}, (err, doc) => {
         if(!err)
            res.send(doc);        
         else 
            consol.log('Error in updating the User: ' + req.params.id + " - " + JSON.stringify(err, undefined, 2) );
    });
}
