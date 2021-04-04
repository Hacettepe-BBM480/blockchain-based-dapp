const router = require("express").Router();
const verify = require("./verifyToken");
const GetContract = require("./../contract/Web3Config");

const OwnerPublicKey = process.env.OWNER_PUBLIC_KEY;

router.get("/getData", (req, res) => {
  GetContract()
    .then(async (contract) => {
      const data = await contract.methods.getSum().call();
      res.send({
        data,
      });
    })
    .catch((error) => {
      res.status(400).send("Error");
    });
});

router.post("/setData", async (req, res) => {
  GetContract().then(async (contract) => {
    const { data1, data2 } = req.body;
    const receipt = await contract.methods
      .Sum(data1, data2)
      .send({ from: OwnerPublicKey });
    const data = await contract.methods.getSum().call();
    res.send({
      txHash: receipt.transactionHash,
      data,
    });
  });
});

module.exports = router;
