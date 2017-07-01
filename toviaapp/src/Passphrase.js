import React, { Component } from 'react';
import Input from 'react-toolbox/lib/input';
import Link from 'react-toolbox/lib/link/Link';
import './Passphrase.css';

class Passphrase extends Component {

  constructor() {
    super();
    this.state = { passphrase: ''};
  }

  handleClick = () => {
    fetch('http://localhost:3001/')
      .then( res => res.json() )
      .then( data => {
        console.log(data)
    });

  }

  handleChange = (inputKey, value) => {
    this.setState({...this.state, [inputKey]: value});
  };

  render() {
    return (
      <div id="passPhraseContainer">
        <Input id="phInput" required style={{width:"100px"}}
          type="text" placeholder="Passphrase" label="Passphrase" onChange={this.handleChange.bind(this, "passphrase")}
          value={this.state.passphrase} maxLength={5} />
        <Link href="#" label="Generate New Passphrase" onClick={this.handleClick} />
      </div>
    );
  }
}

export default Passphrase;
