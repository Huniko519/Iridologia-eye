let mongoose = require('mongoose');
let express = require('express');
const multer = require('multer');
let router = express.Router();
const fs = require("fs");
let PatientSchema = require('../../models/patient');
let UserSchema  = require('../../models/User');

function between(min, max) {  
    return Math.floor(
      Math.random() * (max - min + 1) + min
    )
}
let random = between(1,900000000)

router.post('/upload-left-eye',multer({ dest: 'uploads' }).any(), async (req,res) => {
    console.log(random)
    if(req.files)
    {
        console.log('Left eye')
        var filename = random;
        var originalname = req.files[0].originalname;
        var originalname = originalname.split('.');
        var new_path = 'uploads/patients/'+ filename+'/Left-Eye.jpg';
        var new_folder = 'uploads/patients/'+filename;
        fs.mkdir(new_folder, { recursive: true }, function(err) {
            if (err) {
              console.log(err)
            } else {
              console.log("New directory successfully created.")
              console.log(new_path)
              var old_path = req.files[0].path;
              var save_path =  "avatar.jpg";
              fs.readFile(old_path, function(err, data) {
                  fs.writeFile(new_path, data, function(err) {
                      
                          if(!err){
                             console.log("success")
                             res.json(new_path);
                             
                          }
                          else {
                              console.log(err)
                              res.json({
                                  status : "error"
                              })
                          }
                     
                  });
              });
            }
          })
    }
})

router.post('/upload-right-eye',multer({ dest: 'uploads' }).any(), async (req,res) => {
    console.log(random)
    if(req.files)
    {
        console.log('now good')
        var filename = random;
        var originalname = req.files[0].originalname;
        var originalname = originalname.split('.');
        var new_path = 'uploads/patients/'+filename+'/Right-Eye.jpg';
        var new_folder = 'uploads/patients/'+filename;
        fs.mkdir(new_folder, { recursive: true }, function(err) {
            if (err) {
              console.log(err)
            } else {
              console.log("New directory successfully created.")
              console.log(new_path)
              var old_path = req.files[0].path;
              var save_path =  "avatar.jpg";
              fs.readFile(old_path, function(err, data) {
                  fs.writeFile(new_path, data, function(err) {
                      
                          if(!err){
                             console.log("success")
                             res.json(new_path);
                             
                          }
                          else {
                              res.json({
                                  status : "error"
                              })
                          }
                     
                  });
              });
            }
          })
    }
})

router.route('/create-patient').post((req, res, next) =>{
    UserSchema.findById(req.body.doctor, (error, data)=>{
        if(data.patients>=3+125*data.membership1+500*data.membership2+310*data.membership3){
            return res.status(402).json({patient: "Please buy more space"})
        }
        else{
            if(!req.body.leftEye||!req.body.rightEye){
                return res.status(400).json({patient:"Please upload eye images"});
            }
            else{
            PatientSchema.create(req.body, (error, data) => {
                if (error) {
                    console.log(error)
                    return next(error)
                }
                else{
                    console.log(data)
                    random = between(1,900000000)
                    UserSchema.findByIdAndUpdate(req.body.doctor, {$inc: {patients: 1}}, (err, data)=>{
                        if(err){
                            return err;
                        }
                        else{
                            console.log("sssssssssssssssssssssgood")
                            res.json(data)
                        }
                    })
                }
        })
        }
}
})
})

router.route('/get-all-patients').post((req,res, next) =>{
    PatientSchema.find({doctor: req.body.doctor}, (error,data)=>{
        if(error){
            return next(error)
        }
        else{
            res.json(data);
        }
    })
})

router.route('/get-total-patients').post((req,res, next) =>{
    PatientSchema.find((error,data)=>{
        if(error){
            return next(error)
        }
        else{
            res.json(data);
        }
    })
})

router.route('/get-one-patient').post((req,res, next) =>{
    PatientSchema.find({leftEye: req.body.patient}, (error,data)=>{
        if(error){
            return next(error)
        }
        else{
            res.json(data);
        }
    })
})

router.route('/delete-patient').post((req,res)=>{
    console.log(req.body)
    PatientSchema.findByIdAndRemove(req.body.id, (error,data)=>{
        if(error){
            
        }
        else{
            res.json(data)
        }
    })
})

router.route('/add-consultant').post((req, res)=>{
   PatientSchema.findByIdAndUpdate(req.body.id,{$set:{newInfo:req.body.consultant}}, (error, data)=>{
       if(error){
           console.log(error)
       }
       else{
           res.json(data)
       }
   })
})

module.exports = router;