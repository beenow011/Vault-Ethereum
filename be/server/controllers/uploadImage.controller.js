const ethers = require('ethers');
const UserModel = require('../models/User.model');
const { PinataSDK } = require("pinata-web3");
const { PINATA_API_KEY, PINATA_SECRET_API_KEY } = require('../config/server.config');
const { generateEncryptionKey } = require('../utils/generateKey');
const { encryptFile } = require('../utils/encryption');

async function uploadImage(req, res, next) {
    try {
        // console.log(req.file);
        const userAddress = "0x8119779A622fCBab9c084D9036A5C60A7E7185Fa"
        const user = await UserModel.findOne({ userAddress: userAddress.toLowerCase() });
        if (!user) {
            throw new Error('User not found');
        }
        const pinata = new PinataSDK({
            pinataJwt: PINATA_API_KEY,
            pinataGateway: PINATA_SECRET_API_KEY
        });

        if (user.encryptionKey === null) {
            const encryptionKey = generateEncryptionKey(32);
            user.encryptionKey = encryptionKey;
            await user.save()
        }
        const { encryptedData, iv } = encryptFile(req.file?.buffer, user.encryptionKey);




        res.status(200).json({ message: 'Image uploaded successfully' });


        // some code here
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }

}
module.exports = { uploadImage };

