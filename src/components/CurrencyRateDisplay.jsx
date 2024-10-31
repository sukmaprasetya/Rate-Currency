import React, { useState, useEffect } from 'react';  
import "/node_modules/bootstrap/dist/css/bootstrap.min.css";

const CurrencyRateDisplay = () => {
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);

  const currencies = ['CAD', 'IDR', 'JPY', 'CHF', 'EUR', 'GBP'];
  const API_KEY = '6f09d5ea969a4ddb98acc1becf300815';
  
  const fetchRates = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${API_KEY}&symbols=${currencies.join(',')}`
      );
      if (!response.ok) throw new Error('Failed to fetch rates');
      const data = await response.json();
      if (data.rates) {
        setRates(data.rates);
        setLastUpdate(new Date().toLocaleString());
      } else throw new Error('Invalid data format');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
    const interval = setInterval(fetchRates, 300000);
    return () => clearInterval(interval);
  }, []);

  const calculateBuyRate = (rate) => (parseFloat(rate) * 1.05).toFixed(6);
  const calculateSellRate = (rate) => (parseFloat(rate) * 0.95).toFixed(6);

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        Error: {error}
        <button onClick={fetchRates} className="btn btn-danger btn-sm ml-3">Try Again</button>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Exchange Rates</h2>
        <button
          onClick={fetchRates}
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? 'Refreshing...' : 'Refresh Rates'}
        </button>
      </div>
      {loading && !rates ? (
        <div className="text-center my-3">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      ) : (
        <>
          <table className="table table-hover">
            <thead className="thead-light">
              <tr>
                <th scope="col">Currency</th>
                <th scope="col" className="text-right">We Buy</th>
                <th scope="col" className="text-right">Exchange Rate</th>
                <th scope="col" className="text-right">We Sell</th>
              </tr>
            </thead>
            <tbody>
              {currencies.map((currency) => (
                <tr key={currency}>
                  <td>{currency}/USD</td>
                  <td className="text-success text-right">
                    {rates && calculateBuyRate(rates[currency])}
                  </td>
                  <td className="text-right">
                    {rates && rates[currency]}
                  </td>
                  <td className="text-danger text-right">
                    {rates && calculateSellRate(rates[currency])}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {lastUpdate && (
            <div className="text-muted small">
              Last updated: {lastUpdate}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CurrencyRateDisplay;
