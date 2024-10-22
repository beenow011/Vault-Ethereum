const ethers = require('ethers');
const UserModel = require('../models/User.model');
const { PinataSDK } = require("pinata-web3");
const { PINATA_API_KEY, PINATA_SECRET_API_KEY } = require('../config/server.config');
const { generateEncryptionKey } = require('../utils/generateKey');
const { encryptFile } = require('../utils/encryption');
// const { encryptFile } = require('../utils/encryption');

async function uploadImage(req, res, next) {
    try {
        const userAddress = "0x8119779A622fCBab9c084D9036A5C60A7E7185Fa";
        const user = await UserModel.findOne({ userAddress: userAddress.toLowerCase() });
        if (!user) {
            throw new Error('User not found');
        }

        // const pinata = new PinataSDK({
        //     pinataJwt: PINATA_API_KEY,
        //     pinataGateway: PINATA_SECRET_API_KEY
        // });

        // Check for both null and undefined
        if (!user.encryption) {
            console.log('Encryption key is null or undefined');
            const encryptionKey = generateEncryptionKey(32);
            user.encryption = encryptionKey;
            await user.save();
            console.log('Encryption key generated:', encryptionKey);
        }


        const { encryptedData, iv } = encryptFile(req.file.buffer, user.encryption);
        const pinataSDK = require('@pinata/sdk');
        const pinata = new pinataSDK({ pinataApiKey: PINATA_API_KEY, pinataSecretApiKey: PINATA_SECRET_API_KEY });
        const resPinata = await pinata.pinJSONToIPFS({ encryptedData, iv })
        // console.log(resPinata);

        res.status(200).json({ ipfsHash: resPinata.IpfsHash, message: "Image Uploaded" })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}


module.exports = { uploadImage };

