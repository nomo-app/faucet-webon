import { useEffect, useState } from "react";
import "./Card.scss";
import { nomo } from "nomo-webon-kit";

interface CardProps {
  evmAddress: string | null;
}

export function Card({ evmAddress }: CardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [responseStatus, setResponseStatus] = useState<
    "success" | "error" | null
  >(null);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    if (!evmAddress) {
      return;
    }
    const fetchClaimStatus = async () => {
      const statusUrl = "https://faucet-plugin.zeniq.net/status";
      try {
        const response = await nomo.authHttp({
          url: statusUrl,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ address: evmAddress }),
        });

        if (response.statusCode === 400) {
          setResponseStatus("error");
          setMessage("Already claimed");
        }
      } catch (e) {
        console.error(e);
        setResponseStatus("error");
        setMessage("Failed to connect to " + statusUrl); // screenshot for admins
      }
    };
    fetchClaimStatus();
  }, [evmAddress]);

  const handleClick = async () => {
    if (!evmAddress) {
      return;
    }

    setIsLoading(true);

    const claimUrl = "https://faucet-plugin.zeniq.net/claim";
    try {
      const response = await nomo.authHttp({
        url: claimUrl,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address: evmAddress }),
      });

      if (response.statusCode === 200) {
        setResponseStatus("success");
      } else if (response.statusCode === 400) {
        setResponseStatus("error");
        setMessage("Already claimed");
      } else if (response.statusCode === 410) {
        console.log("ETH address missing!");
      } else {
        setResponseStatus("error");
        setMessage("Got statusCode " + response.statusCode + " from " + claimUrl);
      }

    } catch (error) {
      console.error(error);
      setMessage("Failed to connect to " + claimUrl);
      setResponseStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`card ${isLoading ? "glow" : ""}`}>
      <div className="card-header">
        <img src="/nomo-logo-square.jpg" className="header-image" />
      </div>
      <div className="card-body">
        <img src="/StakingGraphic.svg" />
        {!isLoading && responseStatus === null && (
          <button disabled={responseStatus !== null} onClick={handleClick}>
            Claim ZENIQ
          </button>
        )}
        {isLoading && <div className="spinner"></div>}
      </div>
      <div
        className={`card-footer ${
          responseStatus === "success"
            ? "success"
            : responseStatus === "error"
            ? "error"
            : ""
        }`}
      >
        {responseStatus === "success" && (
          <p className="success-message">Success!</p>
        )}
        {responseStatus === "error" && (
          <p className="error-message">{message}</p>
        )}
      </div>
    </div>
  );
}
