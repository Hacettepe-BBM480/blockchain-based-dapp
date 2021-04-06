const Web3 = require("web3");
const Provider = require("@truffle/hdwallet-provider");

const Contract = require("./Truffle/build/contracts/MyContract.json");

const dotenv = require("dotenv");
dotenv.config();

const OwnerPrivateKey = process.env.OWNER_PRIVATE_KEY;
const NetworkURL = process.env.NETWORK_URL;

const getContract = async () => {
    const provider = new Provider(OwnerPrivateKey,NetworkURL);
    const web3 = new Web3(provider);
    
    const networkId = await web3.eth.net.getId();
    const contract = new web3.eth.Contract(
        Contract.abi,
        Contract.networks[networkId].address
    )
    return contract;
}
module.exports = getContract;