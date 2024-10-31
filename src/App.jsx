import React from 'react';
import CurrencyRateDisplay from './components/CurrencyRateDisplay';
import "/node_modules/bootstrap/dist/css/bootstrap.min.css";
import './App.css';

function App() {
  return (
    <div className="container min-vh-100 d-flex flex-column justify-content-center align-items-center">
      <header className="mb-4 text-center">
        <h1 className="display-4 font-weight-bold text-primary">Currency Exchange Rate</h1>
        <p className="lead text-muted">Rates are based from 1 USD</p>
      </header>
      <main className="w-100">
        <CurrencyRateDisplay />
      </main>
      <footer className="mt-4 text-center text-muted small">
        <p>The application uses API from currencyfreaks.com</p>
      </footer>
    </div>
  );
}

export default App;
