import React, { useEffect, useState } from 'react';
import './App.scss';
import { nomo } from 'nomo-plugin-kit/dist/nomo_api';
import { Card } from './components/Card';

function App() {
  const [walletAddresses, setWalletAddresses] = useState("");

  useEffect(() => {
    const fetchAddresses = async () => {
      const addresses = await nomo.getWalletAddresses()
      setWalletAddresses(addresses.walletAddresses['ETH'])
    }
    fetchAddresses();
  }, []);

  console.log('walletAddresses: ', walletAddresses)

  return (
    <div className='card-container'>
      <Card title='Card Header' walletAddress={walletAddresses}/>
      {/* <GlassCard content='some content' /> */}
    </div>
  );
}

export default App;
