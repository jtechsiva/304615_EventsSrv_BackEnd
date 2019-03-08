const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');
const Event = mongoose.model('Event');

var ObjectId = mongoose.Types.ObjectId;

module.exports.addEvent = (req, res, next) => {
    var event = new Event();
      event.benName = req.body.benName;
   event.baseLocation = req.body.baseLocation;
   event.council = req.body.council;
   event.address = req.body.address;
   event.pocID = req.body.pocID;   
   event.pocDet = req.body.pocDet;   
   event.project = req.body.project;   
   event.eventCat = req.body.eventCat;
   event.eventTitle = req.body.eventTitle;   
   event.eventDesc = req.body.eventDesc;
    event.numberOfVol = req.body.numberOfVol;   
    event.transMod = req.body.transMod;
    event.boardingPtDet = req.body.boardingPtDet;
    event.droppingPtDet = req.body.droppingPtDet;
    event.startDt =  Date.now() ;
    event.endDt = Date.now();
    event.visibleDt = Date.now(); 
    event.isFavorite = req.body.isFavorite;   
    event.createdBy = "348300";
    event.createdDt = Date.now();    
    event.updatedBy = "348300";   
    event.updatedDt = Date.now();

   event.save((err, doc) => {
        if(!err)         
           res.send(doc);
         else{
           console.log('Error in adding the event detail: ' + err);
           return next(err);    
        }      
    });
}

module.exports.getEvents = (req, res) => {
   Event.find(function (err, eventData) {               
       if (err) 
           console.log('Error in Retriving events: ' + JSON.stringify(err, undefined, 2));
       else 
           res.send(eventData);
   });
   
}

module.exports.getEvent = (req, res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('No event record found with given id: ' + req.params.id);
    else {
        Event.findById(req.params.id, function (err, eventData) {               
            if (err) 
                console.log('Error in Retriving Event: ' + JSON.stringify(err, undefined, 2));
            else 
                res.send(eventData);
        });
    }  
}

module.exports.updateEvent = (req, res) => {
    console.log('Before Inside: ' + req.params.id);
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('No event record found with given id: ' + req.params.id);
    else
        var event = {  
            benName: req.body.benName,
          baseLocation: req.body.baseLocation,
          council: req.body.council,
          address: req.body.address,
          pocID: req.body.pocID,
          pocDet: req.body.pocDet,
          project: req.body.project,
          eventCat: req.body.eventCat,
          eventTitle: req.body.eventTitle,
          eventDesc: req.body.eventDesc,
          numberOfVol: req.body.numberOfVol,
          transMod: req.body.transMod,
          boardingPtDet: req.body.boardingPtDet,
          droppingPtDet: req.body.droppingPtDet,
          startDt: req.body.startDt,
          endDt: req.body.endDt,
          visibleDt: req.body.visibleDt,
          isFavorite: req.body.isFavorite,
          updatedBy : "348300",  
            updatedDt : Date.now()
        };

        console.log('Before Update: ' + JSON.stringify(event));
    Event.findByIdAndUpdate(req.params.id, {$set: event}, {new: true}, (err, doc) => {
         if(!err)
            res.send(doc);        
         else 
            consol.log('Error in updating the Event: ' + req.params.id + " - " + JSON.stringify(err, undefined, 2) );
    });
}

module.exports.deleteEvent = (req, res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('No Event record found with given id: ' + req.params.id);
    else
        Event.findByIdAndRemove(req.params.id,  (err, event) => {
                if(!err)
                    return res.send(event);
                else
                    return console.log('Error in Event delete: ' + JSON.stringify(err, undefined, 2) );
            }
        )
}