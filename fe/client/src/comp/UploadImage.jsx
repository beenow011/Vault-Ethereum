import axios from "axios";
import { useState } from "react";
import { useWeb3Context } from "../context/useWeb3Context";
import toast from "react-hot-toast";

const UploadImage = () => {
  const [file, setFile] = useState(null);
  const { Web3State } = useWeb3Context();
  const { selectedAccount, contractInstance } = Web3State;

  const uploadImageHash = async (hash) => {
    const tx = await contractInstance.uploadFile(selectedAccount, hash);
    console.log("tx", tx);
  };

  const handleImageUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const url = "http://localhost:3000/api/uploadImage";
      const res = await axios.post(url, formData);
      // console.log("res", res.data);
      toast.success("Image uploaded successfully!");
      await uploadImageHash(res.data.ipfsHash);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };
  console.log("file", file);
  return (
    <>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleImageUpload}>Upload</button>
    </>
  );
};

export default UploadImage;
