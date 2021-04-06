const User = require("./model/User");

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
 


module.exports = { saveUser,findByEmail };
