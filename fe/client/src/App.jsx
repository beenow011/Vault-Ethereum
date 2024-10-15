import "./App.css";
import Wallet from "./pages/Wallet";
import Web3Provider from "./context/Web3Provider";
import { RouterProvider } from "react-router-dom";
import { BrowserRouter } from "./routes/routes";

function App() {
  return (
    <>
      <Web3Provider>
        <RouterProvider router={BrowserRouter}></RouterProvider>
      </Web3Provider>
    </>
  );
}

export default App;
