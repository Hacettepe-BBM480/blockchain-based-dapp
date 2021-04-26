const User = require("./model/User");
var mongodb = require("mongodb");


const saveUser = async (name,surname,email,digest) => {
  const user = new User({
    name,
    surname,
    email,
    password: digest,
  });
  const savedUser = await user.save();
  return savedUser;
}

const findByEmail = async (email) => {
  const userDB = await User.findOne({ email });
  return userDB;
};

const findAll = async () => {
  const users = await User.find();
  return users;
};

const deleteById = async (id) => {
  try{
    await User.deleteOne({_id: new mongodb.ObjectID(id)});
  }catch (error){
    console.log("fail")
  }
};
 
const updateById = async(id, updatedName,updatedSurname,updatedEmail,) => {
  try{
    await User.findByIdAndUpdate({_id:id}, {email : updatedEmail, name: updatedName, surname: updatedSurname});
  } catch(error){
    console.log(error.message);
  }
}

module.exports = { saveUser,findByEmail,findAll,deleteById,updateById };
