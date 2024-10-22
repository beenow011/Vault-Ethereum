import { ethers } from "ethers";
import contractAbi from "../constants/contractAbi.json";
import toast from "react-hot-toast";
import axios from "axios";
export const connectWallet = async () => {
    try {
        if (!window.ethereum) {
            throw new Error("Please install MetaMask first.");
        }
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });

        const selectedAccount = accounts[0];
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const message = "Welcome to Vault Now!";
        const signature = await signer.signMessage(message);
        // console.log("signature", signature);

        const dataSignature = {
            signature
        }
        const url = "http://localhost:3000/api/authentication?address=" + selectedAccount;
        const res = await axios.post(url, dataSignature);
        console.log("res", res.data);

        const contractAddress = "0x1a46c8E4664b7D42B8deb2b397A2b0756cE2277a";
        // const contractABI = [];
        const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);

        return { contractInstance, selectedAccount };
    } catch (error) {
        console.error(error);
        toast.error(error.message);
        // return { error: error.message };
    }
}