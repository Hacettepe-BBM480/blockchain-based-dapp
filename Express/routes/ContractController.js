const router = require("express").Router();
const verify = require("./verifyLogin");

const { studentValidation ,updateStudentValidation} = require("./validation/ContractValidation");
const { addStudent,deleteStudent,getStudent,updateStudent } = require("../services/ContractService");

router.post("/addStudent", verify, (req, res) => {
  //Validation part
  let { error } = studentValidation(req.body);
  if (error) return res.status(400).send(error);

  const { studentNo } = req.body;

  error = addStudent(studentNo);
  if (error) return res.status(404).send(error);

  res.status(200).send();
});

router.delete("/deleteStudent", verify, (req, res) => {

  let { error } = studentValidation(req.body);
  if (error) return res.status(400).send(error);

  const { studentNo } = req.body;

  error = deleteStudent(studentNo);
  if (error) return res.status(404).send(error);

  res.status(200).send();

});

router.post("/getStudent", verify,async (req, res) => {

  let { error } = studentValidation(req.body);
  if (error) return res.status(400).send(error);

  const { studentNo } = req.body;

  let data = await getStudent(studentNo);
  res.status(200).json(data);
});


router.put("/updateStudent", verify,async (req, res) => {

  let { error } = updateStudentValidation(req.body);
  if (error) return res.status(400).send(error);

  const { studentId,studentNo } = req.body;

  error = await updateStudent(studentId,studentNo);
  if (error) return res.status(404).send(error);

  res.status(200).send();
});

module.exports = router;
