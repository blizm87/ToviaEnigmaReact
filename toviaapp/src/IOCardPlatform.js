import React, { Component } from 'react';
import SendCard from './SendCard.js';
import UserData from './UserData.js';
import ReceiveCard from './ReceiveCard.js';
import MessageHistory from './MessageHistory.js';
import './IOCardPlatform.css';

class IOCardPlatform extends Component {

  constructor() {
    super();
    this.state = { profile: '', passPhrase: '' };
  };

  handleProfileData = () => {
    let urlParams = new URLSearchParams(window.location.search);
    let paramRes = urlParams.get('userId')
    fetch(`http://127.0.0.1:3001/profile?userId=${paramRes}`)
      .then( res => res.json() )
      .then( profiledata => {
        console.log('HELLO JKS')
        console.log(profiledata.data[0])
        this.setState({profile: profiledata.data[0]});
      })
  };

  handlePassPhrase = () => {
    let result = '';
    let letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    for(var i = 0; i < 5; i++){
      let randChar = Math.floor(Math.random()*letters.length)
      result += letters.charAt(randChar)
    }
    console.log(result)
    this.setState({ passPhrase: result })
  }

  componentWillMount() {
    this.handleProfileData();
  };

  componentDidMount() {
    this.handlePassPhrase();
  }

  render() {
    return (
      <div id='ioCardPlatformContainer'>
        <UserData data={this.state.profile} passPhrase={this.state.passPhrase} />
        <SendCard data={this.state.profile} />
        <ReceiveCard data={this.state.profile} />
        <MessageHistory data={this.state.profile} />
      </div>
    );
  }
}

export default IOCardPlatform;
