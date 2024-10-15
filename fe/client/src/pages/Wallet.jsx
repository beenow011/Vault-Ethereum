import { useWeb3Context } from "../context/useWeb3Context";
import { connectWallet } from "../utils/connectWallet";

const Wallet = () => {
  const web3State = useWeb3Context();
  // console.log(web3State);

  return (
    <div>
      <button onClick={connectWallet}>Connect Wallet</button>
    </div>
  );
};

export default Wallet;
