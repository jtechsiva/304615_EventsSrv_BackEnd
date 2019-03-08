const mongoose = require("mongoose");

var volregSchema = mongoose.Schema({
    regTo: {type: String},
    regDt: {type: Date},
    regStatus:{type: String},
    sourceType:{type: String},
    createdBy: {type: String},
    createdDt:{type: Date},
    updatedBy: {type: String},
    updatedDt: { type: Date}
});


mongoose.model('Volreg', volregSchema);