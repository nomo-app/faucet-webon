import { Fragment, useEffect, useState } from "react";
import "./App.scss";
import { nomo } from "nomo-webon-kit";
import { Card } from "./components/Card/Card";

function App() {
  const [evmAddress, setEvmAddress] = useState<string | null>(null);

  useEffect(() => {
    const fetchAddresses = async () => {
      const address = await nomo.getEvmAddress();
      setEvmAddress(address);
    };
    fetchAddresses();
  }, []);

  return (
    <Fragment>
      <div className="card-container">
        <Card evmAddress={evmAddress} />
      </div>
    </Fragment>
  );
}

export default App;
