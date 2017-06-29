import React, { Component } from 'react';
import Button from 'react-toolbox/lib/button/Button';
import Link from 'react-toolbox/lib/link/Link';
import './Passphrase.css';

class Passphrase extends Component {
  render() {
    return (
      <div id='passPhraseContainer'>
        <p>Your Passphrase -</p>
        <Link href="#" label="Generate New Passphrase" />
      </div>
    );
  }
}

export default Passphrase;
