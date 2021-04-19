const Web3 = require("web3");
const Provider = require("@truffle/hdwallet-provider");

const MyContract = require("./MyContract.json");

const dotenv = require("dotenv");
dotenv.config();

const OwnerPrivateKey = process.env.OWNER_PRIVATE_KEY;
const NetworkURL = process.env.NETWORK_URL;

var ContractFactory = (function(){
    async function ContractClass() {
        const provider = new Provider(OwnerPrivateKey,NetworkURL);
        const web3 = new Web3(provider);
        
        const networkId = await web3.eth.net.getId();
        const contract = new web3.eth.Contract(
            MyContract.abi,
            MyContract.networks[networkId].address
        )
        return contract;
    }
    var instance;
    return {
        getInstance: function(){
            if (instance == null) {
                instance = ContractClass()
            }
            return instance;
        }
   };
})();


module.exports = ContractFactory;