import { useEffect } from "react";
import { useWeb3Context } from "../context/useWeb3Context";
import { connectWallet } from "../utils/connectWallet";
import { useNavigate } from "react-router-dom";

const Wallet = () => {
  const { updateWeb3State, Web3State } = useWeb3Context();
  const { selectedAccount } = Web3State;
  const navigate = useNavigate();
  useEffect(() => {
    if (selectedAccount) {
      // console.log("selectedAccount", selectedAccount);
      navigate("/home");
    }
  }, [selectedAccount, navigate]);

  const handleConnectWallet = async () => {
    try {
      const { contractInstance, selectedAccount } = await connectWallet();
      updateWeb3State({ contractInstance, selectedAccount });
    } catch (error) {
      console.error(error);
    }
  };
  // console.log(web3State);

  return (
    <div>
      <button onClick={handleConnectWallet}>Connect Wallet</button>
    </div>
  );
};

export default Wallet;
