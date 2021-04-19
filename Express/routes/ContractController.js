const router = require("express").Router();
const verify = require("./verifyLogin");
const fs = require("fs");

const ipfsClient = require('ipfs-http-client');
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' });

const { studentValidation ,updateStudentValidation} = require("./validation/ContractValidation");
const { addStudent,deleteStudent,getStudent,updateStudent,getFile,uploadFile } = require("../services/ContractService");

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

router.post("/getStudent",async (req, res) => {

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

router.post("/uploadFile",async(req,res)=>{

  const buffer =fs.readFileSync('/home/msk/Downloads/Project/Express/routes/Dd.docx');
  const {_name, description, studentId } = req.body;
  
  const addedfile = await ipfs.add(buffer);
  error = await uploadFile(addedfile,_name, description, studentId);
  
  if (error) return res.status(404).send(error);

  res.status(200).send();

});

router.post('/getFile', async (req, res) => {
  
  const { studentNo } = req.body;
  let file = await getFile(studentNo);
  res.status(200).send(file);
});

module.exports = router;
