import React, { Component } from 'react';
import TextCard from './TextCard.js';
import Passphrase from './Passphrase.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <TextCard />
        <Passphrase />
      </div>
    );
  }
}

export default App;
