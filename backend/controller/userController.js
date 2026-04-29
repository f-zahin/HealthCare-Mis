import { UserModel } from "../model/UserModel.js";

import bcrypt from "bcryptjs";
import { sendToken } from "../utlil/SendToken.js";

// create User

const createUser = async (req, res) => {
  try {
    const { name, email, password ,role} = req.body;
    const user = await UserModel.create({
      name,
      email,
      password,
      role
    });

    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.log(error.message);
  }
};

// login User

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    const isMatche = await user.verfiyPassword(password);

    if (!isMatche) {
      return res
        .status(400)
        .json({ success: false, message: "invalid userName or password" });
    }
    sendToken(user, 200, res);

    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.log(error.message);
  }
};

// get User

const getUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user._id);
    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.log(error.message);
  }
};

// get All Users
const getUsers = async(req,res)=>{
  try{
    const users = await UserModel.find();
    return res.status(200).json({success:true,users});
  }catch(error){
    console.log(error.message);
  }
}

// update Password

const updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;

    if (!oldPassword || !newPassword || !confirmPassword) {
      return res
        .status(501)
        .json({ success: false, message: "invalid password field" });
    }
    const user = await UserModel.findById(req.user.id).select("+password");

    const checkPassword = await user.verfiyPassword(oldPassword);
    if (!checkPassword) {
      return res
        .status(501)
        .json({ success: false, message: "invalid oldPassword" });
    }

    if(newPassword !== confirmPassword){
       return res
        .status(501)
        .json({ success: false, message: "newPassword dosenot match confirmPassword" });
    }

    user.password=newPassword;
    await user.save();

    return res.status(200).json({success:true,message:'Successfully updated'})

  } catch (error) {
    console.log(error.message);
  }



};


// delete User

export const deleteUser = async(req,res)=>{
  try{
    const id= req.params.id
    
    const user = await UserModel.findByIdAndDelete(id);
    return res.status(200).json({success:true,user})

  }catch(error){
    console.log(error.message)
  }
}

// logout user
const logout = async(req,res)=>{
  try{
    res.cookie("token",null,{
      expires:new Date(Date.now()),
      httpOnly:true
    })

    res.status(200).json({success:true,message:'successfully logout user'})
  }catch(error){
    console.log(error.message);
  }

}

// update User

export const updateUser = async(req,res)=>{
  try{
    const id  = req.params.id;
    const data = await UserModel.findByIdAndUpdate(id,req.body,{
      runValidators:true,
      new:true
    });
    return res.status(200).json({success:true,data})

  }catch (error){
    console.log(error)
  }
}




export { createUser, loginUser, getUser ,updatePassword,logout,getUsers};
