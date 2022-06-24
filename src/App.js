import { useEffect, useState } from 'react';

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [selectedSym, setSelectedSym] = useState('');
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [btc, setBtc] = useState(0);

  const onSelect = (event) => {
    setSelectedSym(event.target.value);
  };

  const onChange = (event) => {
    const amount = event.target.value;
    for (let coin of coins) {
      if (coin.symbol === selectedSym) {
        setSelectedPrice(coin.quotes.USD.price * amount);
      }
    }
  };

  useEffect(() => {
    fetch('https://api.coinpaprika.com/v1/tickers?limit=20')
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
        for (let coin of json) {
          if (coin.symbol === 'BTC') {
            setBtc(coin.quotes.USD.price);
          }
        }
      });
  }, []);

  return (
    <div>
      <h1>The Coins! ({loading ? '' : coins.length})</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <select onChange={onSelect}>
          {coins.map((coin, index) => (
            <option key={index} value={coin.symbol}>
              {coin.name} ({coin.symbol}): {coin.quotes.USD.price} USD
            </option>
          ))}
        </select>
      )}
      <br />
      <input
        onChange={onChange}
        type="number"
        placeholder="amount to convert"
      />
      <label>{selectedSym}</label>
      {}
      <h3>equals to {selectedPrice / btc} BTC</h3>
    </div>
  );
}

export default App;
