import UploadImage from "../comp/UploadImage";
import { useWeb3Context } from "../context/useWeb3Context";

const Home = () => {
  const { Web3State } = useWeb3Context();
  const { selectedAccount } = Web3State;
  return (
    <div>
      Hello, {selectedAccount}
      <UploadImage />
    </div>
  );
};

export default Home;
