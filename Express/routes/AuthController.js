const router = require("express").Router();

const {
  registerValidation,
  loginValidation,
} = require("./validation/AuthValidation");
const { register, login } = require("../services/AuthService");

const verify = require("./verifyLogin");

router.post("/register", verify, async (req, res) => {
  //Validation part
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error);

  const { name, surname, email, password } = req.body;

  try {
    const response = await register(name, surname, email, password);
    res.send(response);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/login", async (req, res) => {
  //Validation part
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error);

  const { email, password } = req.body;

  try {
    const response = await login(email, password);
    res.send(response);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
