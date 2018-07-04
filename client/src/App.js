import React, { Component } from 'react';
import './App.css';
import Cards from './components/cards/cards';
import playing_cards from './assets/playing_cards.png';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={playing_cards} className="App-logo" alt="logo" />
          <h1 className="App-title">Fortress Defenders API</h1>
        </header>
        <Cards />
      </div>
    );
  }
}

export default App;
