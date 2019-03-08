const express = require("express");
const router = express.Router();

const ctrlUser = require("../controllers/user.controller");
const ctrlEvent = require("../controllers/event.controller");
const ctrlProject = require("../controllers/project.controller");
const ctrlVolReg = require("../controllers/volreg.controller");

const ctrlEventList = require("../controllers/pevent.controller");



const jwtHelper = require("../config/jwtHelper");


router.post('/addUser', ctrlUser.addUser);
router.post('/authenticate', ctrlUser.authenticate);
router.get('/user/:id', ctrlUser.getUser);
// router.get('/userlist', jwtHelper.verifyJwtToken, ctrlUser.getUsers);
// router.get('/userProfile', jwtHelper.verifyJwtToken, ctrlUser.userProfile);
// router.get('/updateUser:id', jwtHelper.verifyJwtToken, ctrlUser.updateUser);
// router.get('/deleteUser:id', jwtHelper.verifyJwtToken, ctrlUser.deleteUser);

// router.get('/user/:id', jwtHelper.verifyJwtToken, ctrlUser.getUser);

router.get('/userlist', jwtHelper.verifyJwtToken, ctrlUser.getUsers);
router.get('/userProfile', jwtHelper.verifyJwtToken, ctrlUser.userProfile);
router.post('/updateUser/:id', ctrlUser.updateUser);
router.delete('/deleteUser/:id', ctrlUser.deleteUser);

router.post('/addEvent', ctrlEvent.addEvent);
router.get('/getEvents', ctrlEvent.getEvents);
router.get('/getEvent/:id', ctrlEvent.getEvent);
router.post('/updateEvent/:id', ctrlEvent.updateEvent);
router.delete('/deleteEvent/:id', ctrlEvent.deleteEvent);

router.post('/addProject', ctrlProject.addProject);
router.get('/getProjects', ctrlProject.getProjects);

router.post('/regUser/:id', ctrlVolReg.Register);

router.get('/procEventDet', ctrlEventList.getEventDetails);


module.exports = router;
