const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
   firstName:{type:String, default:null},
   lastName: {type:String, default:null},
   email:{type:String, unique:true},
   password:{type:String},
   token:{trype:String}
})
module.exports = mongoose.model('user', userSchema)



// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   first_name: { type: String, default: null },
//   last_name: { type: String, default: null },
//   email: { type: String, unique: true },
//   password: { type: String },
//   token: { type: String },
// });

// module.exports = mongoose.model("user", userSchema);