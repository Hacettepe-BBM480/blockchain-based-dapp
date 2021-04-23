const ContractFactory = require("../contract/Web3Config");
const uniquid = require("uniquid");
const OwnerPublicKey = process.env.OWNER_PUBLIC_KEY;



const addStudent  = (studentNo) => {
  ContractFactory.getInstance()
    .then(async (contract) => {
      await contract.methods.addStudent(uniquid(),studentNo).send({ from: OwnerPublicKey })
    })
    .catch((error) => {
      return error;
    });
}

const deleteStudent = (studentNo) => {
  ContractFactory.getInstance()
    .then(async (contract) => {
        await contract.methods.deleteStudent(studentNo).send({ from: OwnerPublicKey })
    })
    .catch((error) => {
      return error;
    });
}

const updateStudent = (studentId,studentNo) => {
  ContractFactory.getInstance()
    .then(async (contract) => {
      await contract.methods.updateStudent(studentId,studentNo).send({ from: OwnerPublicKey })
    })
    .catch((error) => {
      return error;
    });
}


const getStudent = async (studentNo) => {
    let contract = await   ContractFactory.getInstance();
    let data = await contract.methods.getStudent(studentNo).call();
    return data;
}

const getAllStudent = async () => {
    let contract = await ContractFactory.getInstance();
    let data = await contract.methods.getAllStudent().call();
    return data;
}

const uploadFile = async(addedfile,_name, description, studentId,extension)=>{

  ContractFactory.getInstance().then(async (contract) => {
            await contract.methods.uploadFile(uniquid(), addedfile[0].hash, addedfile[0].size,extension,_name,description,studentId).send({ from: OwnerPublicKey });
        })
        .catch((error) => {
            return error;
        });
}

const getFile = async(studentNo)=>{
  let contract = await ContractFactory.getInstance();
  let data = await contract.methods.getFilesOfStudent(studentNo).call();
  return data;
}

module.exports = {addStudent,deleteStudent,getStudent,updateStudent,getFile,uploadFile,getAllStudent}