import mongoose from "mongoose";
import validator from "validator";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter name"],
    maxlength: [25, "please enter name fewer than 25 characters"],
    minlength: [5, "please enter name more than 5 letters"],
  },
  email: {
    type: String,
    required: [true, "please enter email"],
    unique: true,
    validate: [validator.isEmail, "please enter valid email"], // ✅ FIXED
  },
  password: {
    type: String,
    required: [true, "please enter password"],
    minlength: [8, "please enter at least 8 character password"],
  },
  role: {
    type: String,
    default: "user",
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password =await bcryptjs.hash(this.password, 10);
});

userSchema.methods.getJWTToken=function(){
    return jwt.sign({id:this.id},process.env.JWT_SECRET_KEY,{
        expiresIn:process.env.Expires_token
    })
}   

userSchema.methods.verfiyPassword = async function(userEnterdPassword){
    return await bcryptjs.compare(userEnterdPassword,this.password);
}

const UserModel = mongoose.model("User", userSchema);

export { UserModel };
