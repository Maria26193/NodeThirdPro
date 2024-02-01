var express = require('express');
var router = express.Router();
var userModel = require("./users");

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index', { title: 'Demo project 3' });
});

router.get('/add', async function (req, res) {
 let userData =  await userModel.create({
    userName: "Azka",
    password: "password",
    fatherName: "Raghav",
    motherName: "Halim",
    desc: "THis is Node ",
    categories:["Html"],
  });
  res.send(userData);
});
// Search All Data
router.get('/search', async function (req, res) {
  // 2.1 Howcan i perform case senstive search in mongo DB? for live Search same like data
  // var regex = new RegExp("azk","i");
  // 2.1 Howcan i perform case senstive search in mongo DB? ^ MEANSSTARTING SAME AS $ ENDING SAME AS
  var regex = new RegExp("^jAin$","i");
 let userFind =  await userModel.find({userName: regex});
  res.send(userFind);
});

// Search One Data
router.get('/searchOne', async function (req, res) {
  // 2.1 Howcan i perform case senstive search in mongo DB? for live Search same like data
  // var regex = new RegExp("azk","i");
  // 2.1 Howcan i perform case senstive search in mongo DB? ^ MEANSSTARTING SAME AS $ ENDING SAME AS
  var regex = new RegExp("^Jain$","i");
 let userFind =  await userModel.findOne({userName: regex});
  res.send(userFind);
});
// 2.2 How can i Fond Document Where an array field contains all of a set of values?
router.get('/searchArr', async function (req, res) {
 var regex = new RegExp("^jAin$","i");
 let userFind =  await userModel.find({categories:{
  $all : ["PHP","SQL"]
 }});
  res.send(userFind);
});

// 2.3 How can I search a Document with a specific date range in  mongoose?

router.get('/searchByDate', async function (req, res) {
  var fdate = new Date('2024-01-31'); 
  var ldate = new Date('2024-02-01'); 
  let userFind =  await userModel.find({dateAdded:{
   $gte: fdate, $lte:ldate
  }});
   res.send(userFind);
 });

// 2.4 How  can i filter Document base on the existance of a field in mongoose?
 router.get('/findSchemaExist', async function (req, res) {
  // Same as Array Search
  let userFind =  await userModel.find({motherName:{ $exists : true}
  });
   res.send(userFind);
 });
//2.5 How can i filter Document based on a specific field's length in mongoose
 router.get('/findlenData', async function (req, res) {
  // Same as Array Search
  let userFind =  await userModel.find({
    $expr:{
      $and : [
        { $gte : [{$strLenCP: '$desc'},0]},
        { $lte : [{$strLenCP: '$desc'},20]},
        
      ]
    }
  });
   res.send(userFind);
 });

router.get('/login', function (req, res) {
  req.flash("Name", "Demo 3");
  req.flash("Project", "3");
  // res.send print value on page like in php echo
  res.send('Data Added Suceessfully In Flash');
});

router.get('/logout', function (req, res) {
  console.log(req.flash("Name"), req.flash("Project"));
  res.send('Data Added Suceessfully In Flash form Logout route Pls Check value in terminal');

});

module.exports = router;
