const router = require("express").Router();
const verify = require("./verifyLogin");

const { getAllPersonel,deletePersonel,updatePersonel } = require("../services/PersonelService");

router.get("/getAll", verify,async (req, res) => {
    try {
        const response = await getAllPersonel();
        res.send(response);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.delete("/delete",verify, async (req,res) => {
    const {id} = req.body;
    const error = await deletePersonel(id);
    if(error) {
        res.status(400).send(error.message);
    }
    res.status(200).send();
})

router.put("/update", verify, async(req, res) =>{
    const{id, name, surname, email} = req.body;
    const error = await updatePersonel(id, name, surname, email);
    if(error) {
        res.status(400).send(error.message);
    }
    res.status(200).send();
})

module.exports = router;
