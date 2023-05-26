// const mongoose = require('mongoose');

// const  studentInfoSchema= new mongoose.Schema({
//     name:{type:String, unique:true},
//     email:{type:String, unique:true},
// webhookDetails:[{
//     eventName:String,
//     endPointUrl: String
//     }]

//     // number:{type:Number, required:true}
// });

// const studentModel=mongoose.model('Name', studentInfoSchema);

// exports.studentModel = studentModel;

const mongoose = require("mongoose");
const leadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  other: {
    type: String,
    required: false,
  },
  webhookDetails:[{
    eventName: String,
    endpointUrl: String,
  }]
});
const leadModel = mongoose.model("lead", leadSchema);
module.exports = leadModel;
