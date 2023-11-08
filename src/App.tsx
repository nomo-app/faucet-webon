import React, { Fragment, useEffect, useState } from "react";
import "./App.scss";
import { nomo } from "nomo-plugin-kit/dist/nomo_api";
import { Card } from "./components/Card/Card";
import { Spinner } from "./components/Spinner/Spinner";

function App() {
  const [walletAddresses, setWalletAddresses] = useState("");
  const [backendAvailable, setBackendAvailable] = useState(false);

  useEffect(() => {
    const fetchBackendStatus = async () => {
      const response = await nomo.authHttp({
        url: "https://faucet-plugin.zeniq.net/",
        method: "GET",
      });

      if (response.statusCode === 202) {
        setBackendAvailable(true);
      }
    };
    fetchBackendStatus();
  }, [backendAvailable]);

  useEffect(() => {
    const fetchAddresses = async () => {
      const addresses = await nomo.getWalletAddresses();
      setWalletAddresses(addresses.walletAddresses["ETH"]);
    };
    fetchAddresses();
  }, []);

  return (
    <Fragment>
      {backendAvailable ? (
        <div className="card-container">
          <Card walletAddress={walletAddresses} />
        </div>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
}

export default App;
