const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Patientschema = new Schema({
    doctor: {
    type: String,
    required: true
    },
    name: {
      type: String
      },
    email: {
    type: String
      },
    contact: {
      type: String
    },
    profession: {
      type: String
    },
    gender: {
      type: String
    },
    birthdate: {
      type: String
      
    },
    reasonConsultation: {
      type: String
    },
    takeScan: {
      type: String
    },
    haveDisease: {
      type: String
    },
    newInfo: {
      type: String
      
    },
    leftEye: {
      type: String
      
    },
    rightEye: {
      type: String
    },
    consultantDate: {
        type: Object
    }
    // consultant : [new Schema({
    //     cons: {type: Array},
    // }, {strict: false})
    // ]
  });
  
  module.exports = Patient = mongoose.model("patients", Patientschema);