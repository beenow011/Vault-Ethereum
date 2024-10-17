const ethers = require('ethers');
const UserModel = require('../models/User.model');
async function authController(req, res, next) {
    try {
        const { signature } = req.body;
        const { address } = req.query;

        if (!signature) {
            throw new Error('Signature is required');
        }
        const recoveredAddress = ethers.utils.verifyMessage("Welcome to Vault Now!", signature);
        // console.log(recoveredAddress);
        if (recoveredAddress.toLowerCase() !== address.toLowerCase()) {
            throw new Error('Signature verification failed');
        } else {
            const address = recoveredAddress.toLowerCase();
            const user = await UserModel.findOne({ userAddress: address })
            if (!user) {
                const newUser = await UserModel.create({ userAddress: address });
                //   console.log("User created successfully", newUser);
            }
            res.status(200).json({ message: 'Signature verification successful' });
        }

        // some code here
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }

}
module.exports = { authController };

