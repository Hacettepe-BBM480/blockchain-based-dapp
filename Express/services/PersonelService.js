
const { findAll,deleteById,updateById} = require("../repository/UserRepository");


const getAllPersonel = async () => {
    const users = await findAll();
    return users.map( ({_id,name,surname,email}) => {
        return {
            _id,
            name,
            surname,
            email
        }
    })
};


const deletePersonel = async (id) => {
    try{
        await deleteById(id);
    }catch (error){
        return error;
    }
};

const updatePersonel = async (id, updatedName,updatedSurname,updatedEmail) => {
    try{
        await updateById(id, updatedName, updatedSurname, updatedEmail);
    }catch (error){
        return error;
    }
};

module.exports = {getAllPersonel,deletePersonel,updatePersonel}