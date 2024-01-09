import { useEffect, useState } from 'react'
import './Card.scss'
import { nomo } from 'nomo-webon-kit'

interface CardProps {
  title: string,
  walletAddress: string
}

export function Card({ title, walletAddress }: CardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [responseStatus, setResponseStatus] = useState<'success' | 'error' | null>(null);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    if (!walletAddress) { return; }
    const fetchClaimStatus = async () => {
      const response = await nomo.authHttp({
        url: "https://1abb-91-114-27-50.ngrok-free.app/status", method: "POST", headers: {
          'Content-Type': 'application/json'
        }, body: JSON.stringify({ address: walletAddress })
      })

      if (response.statusCode === 400) {
        setResponseStatus('error');
        setMessage('Already claimed');
      }
    }
    fetchClaimStatus();
  }, [walletAddress]);

  const handleClick = async () => {
    setIsLoading(true);

    if (!walletAddress) { return; }

    try {
      const response = await nomo.authHttp({
        url: "https://1abb-91-114-27-50.ngrok-free.app/claim", method: "POST", headers: {
          'Content-Type': 'application/json'
        }, body: JSON.stringify({ address: walletAddress })
      })

      if (response.statusCode === 200) {
        setResponseStatus('success');
      } else if (response.statusCode === 400) {
        setResponseStatus('error');
        setMessage('Already claimed');
      } else if (response.statusCode === 410) {
        console.log('ETH address missing!');
      } else if (response.statusCode === 500) {
        setResponseStatus('error');
        setMessage('Internal server error')
      } else {
        setMessage('Unknown error occured')
      }

      setIsLoading(false);
    }
    catch (error) {
      console.log("Error during accessing the faucet");
      console.log(error)
      setIsLoading(false);
    }
  }


  return (
    <div className={`card ${isLoading ? 'glow' : ''}`}>
      <div className='card-header'>


        <img src='/nomo-logo-square.jpg' className='header-image' alt='nomo logo sqaure' />
      </div>
      <div className='card-body'>

        <img src='/StakingGraphic.svg' alt='staking graphic' />
        {!isLoading && responseStatus === null && (
          <button disabled={responseStatus !== null} onClick={handleClick}>Claim ZENIQ</button>
        )}
        {isLoading && <div className="spinner"></div>}
      </div>
      <div className={`card-footer ${responseStatus === 'success' ? 'success' : responseStatus === 'error' ? 'error' : ''}`}>
        {responseStatus === 'success' && <p className='success-message'>Success!</p>}
        {responseStatus === 'error' && <p className='error-message'>{message}</p>}
      </div>
    </div>
  )
}