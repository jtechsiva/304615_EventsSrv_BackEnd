const mongoose = require('mongoose');
const Volreg = mongoose.model('Volreg');

const Event =  mongoose.model('Event');

module.exports.Register = (req, res, next) => {
   
   Volreg.findOne({regTo: '348300'}, 
      (err, vreg) => {
          if(!vreg){
            var volreg = new Volreg();
            volreg.regTo = "348300";
            volreg.regDt = Date.now();
            volreg.regStatus = "Confirmed";
            volreg.sourceType = "Single";
            volreg.createdBy = "348300";
            volreg.createdDt = Date.now();
            volreg.updatedBy = "348300";
            volreg.updatedDt = Date.now(); 
            console.log("Before Update in volreg: ");
            volreg.save((err, doc) => {
                 if(!err)
                 {
                    console.log("Volunteering Registration has been completed");
                    
                    console.log("Event ID: " + req.params.id + " | Vol Reg ID: " + doc._id) ;
                    Event.findByIdAndUpdate(req.params.id, 
                       {$push: { regUsers : doc._id }}, 
                       {safe: true, upsert: true}, (err, event) => {
                          if(err)
                             consol.log('Error in updating the User to Event collection: ' + req.params.id + " - " + JSON.stringify(err, undefined, 2) );
                    });
                    //res.send(doc);        
                 }
                 else{
                     if(err.code === 11000)
                        res.status(422).send(["You are already register."]);
                     else 
                        return next(err);          
                 }
            });
          }
          else
          {
            console.log('User is already register to the event');             
            return res.status(200).json({ status: true, message: 'User is already register to the event'});
          }
      }
  )

  
}
