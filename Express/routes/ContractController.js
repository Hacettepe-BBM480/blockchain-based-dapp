const router = require("express").Router();
const verify = require("./verifyLogin");
const fs = require("fs");

const ipfsClient = require('ipfs-http-client');
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' });

const { studentValidation ,updateStudentValidation,deleteStudentValidation} = require("./validation/ContractValidation");
const { addStudent,deleteStudent,getStudent,updateStudent,getFile,uploadFile,getAllStudent } = require("../services/ContractService");

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

  let { error } = deleteStudentValidation(req.body);
  if (error) return res.status(400).send(error);

  const { studentNo } = req.body;

  error = deleteStudent(studentNo);
  if (error) return res.status(404).send(error);

  res.status(200).send();

});

router.get('/getAllStudent', verify, async(req, res) => {
  try{
     let students = await getAllStudent();
     let data = [];
     students.forEach(studentArray => {
       const [studentId,studentNo] = studentArray;
       if(studentId.trim() !== "" && studentNo.trim() !== ""){
         data.push({
           studentId,
           studentNo
         });
       }
     })
     res.status(200).json(data);
  }catch(error){
     res.status(400).send(error.message);
  }
})

router.post("/getStudent", verify, async (req, res) => {

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

router.post("/uploadFile", verify, async(req,res)=>{

  const {name, description, studentId,buffer,extension } = req.body;
  let buff = new Buffer(buffer, 'base64');

  const addedfile = await ipfs.add(buff);
  error = await uploadFile(addedfile,name, description, studentId,extension);

  if (error) return res.status(404).send(error);

  res.status(200).send();

});

router.post('/getFile', verify, async (req, res) => {
  
  const { studentNo } = req.body;
  let file = await getFile(studentNo);
  res.status(200).send(file);
});

module.exports = router;
