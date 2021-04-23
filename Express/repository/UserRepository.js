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
 


module.exports = { saveUser,findByEmail,findAll,deleteById };
