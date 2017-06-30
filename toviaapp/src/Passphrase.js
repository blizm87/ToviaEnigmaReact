import React, { Component } from 'react';
import Link from 'react-toolbox/lib/link/Link';
import './Passphrase.css';

class Passphrase extends Component {

  Cors

  handleClick = () => {
    fetch('http://127.0.0.1:3001/')
      .then( res => res.json() )
      .then( data => {
        console.log(data)
    });

  }

  render() {
    return (
      <div id='passPhraseContainer'>
        <p>Your Passphrase -</p>
        <Link href="#" label="Generate New Passphrase" onClick={this.handleClick} />
      </div>
    );
  }
}

export default Passphrase;
