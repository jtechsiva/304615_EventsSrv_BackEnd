const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');
const Project = mongoose.model('Project');

var ObjectId = mongoose.Types.ObjectId;

module.exports.addProject = (req, res, next) => {
   var project = new Project();
   project.projectName = req.body.projectName;
   project.eventCat = req.body.eventCat;
   
   project.save((err, doc) => {
        if(!err)
           res.send(doc);        
        else{
            if(err.code === 11000)
               res.status(422).send(["Duplicate email address found."]);
            else 
            {
                console.log(err);
               return next(err); 
            }         
        }
   });
}

module.exports.getProjects = (req, res) => {
    Project.find(function (err, projectData) {               
        if (err) 
            console.log('Error in Retriving Users: ' + JSON.stringify(err, undefined, 2));
        else 
            res.send(projectData);
    });  
}
