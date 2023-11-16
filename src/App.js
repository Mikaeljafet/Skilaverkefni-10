import React from 'react';
import logo from './logo.svg';
import './App.css';
import CanvasBranch from './CanvasBranch'; 

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Skilaverkefni 10</h1>
        <p>Hér fyrir neðan eru hringir sem þú getur breytt með því að hreyfa við slidernum fyrir neðan. Einnig er hægt að taka myndir.</p>
        <CanvasBranch />
      </header>
    </div>
  );
}

export default App;
