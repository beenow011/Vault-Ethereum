import { useWeb3Context } from "../context/useWeb3Context";

const Home = () => {
  const { Web3State } = useWeb3Context();
  const { selectedAccount } = Web3State;
  return <div>Hello, {selectedAccount}</div>;
};

export default Home;
