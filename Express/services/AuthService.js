const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { saveUser, findByEmail } = require("../repository/UserRepository");

const login = async (email,password) => {
  const userDB = await findByEmail(email);
  if (userDB) {
    //PASSWORD COMPARE
    const validPass = bcrypt.compare(password, userDB.password);
    if (!validPass) throw Error("Email or password is wrong.");

    //Create and assign a token
    const token = jwt.sign(
      { _id: userDB._id, email: userDB.email,role:"ROLE_ADMIN" },
      process.env.TOKEN_SECRET
    );
    return token;
  } else {
    throw Error("Email or password is wrong.");
  }
};

//        res.header("auth-token",token).send(token);

const register = async (name, surname, email, password) => {
  //Checking if the user is already in database
  const userDB = await findByEmail(email);
  if (userDB) throw Error("Email already exists.");

  const salt = await bcrypt.genSalt(10);
  const digest = await bcrypt.hash(password, salt);

  return saveUser(name,surname,email,digest);
};

module.exports = {login,register}
