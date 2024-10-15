export const connectWallet = async () => {
    if (!window.ethereum) {
        throw new Error("Please install MetaMask first.");
    }
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });

    console.log(accounts[0]);
}