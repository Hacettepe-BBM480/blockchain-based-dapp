const Joi = require("@hapi/joi");

const studentValidation = (data) => {
  const schema = {
    studentNo: Joi.string().min(7).required(),
  };
  return Joi.validate(data, schema);
};

const deleteStudentValidation = (data) => {
    const schema = {
        studentNo: Joi.string().min(7).required()
    };
    return Joi.validate(data, schema);
};

const updateStudentValidation = (data) => {
    const schema = {
        studentId: Joi.string().min(7).required(),
        studentNo: Joi.string().min(7).required(),
    };
    return Joi.validate(data, schema);
  };

module.exports = { studentValidation ,updateStudentValidation,deleteStudentValidation};
