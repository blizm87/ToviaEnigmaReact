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
    this.handleProfileData = this.handleProfileData.bind(this);
    this.handleProfileData();
  };

  handlePassPhrase = () => {
    let result = '';
    let letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    for(var i = 0; i < 5; i++){
      let randChar = Math.floor(Math.random()*letters.length)
      result += letters.charAt(randChar)
    }
    this.setState({ passPhrase: result })
    return result;
  };

  handleProfileData() {
    let urlParams = new URLSearchParams(window.location.search);
    let paramRes = urlParams.get('userId')
    let query = `{
      getProfileData(userId: \"${paramRes}\") {
        userId
        displayName
        gender
        imageUrl
        inbox {
          fromUser
          content
          expireDate
        }
        outbox {
          toUser
          passPhrase
          content
          expireDate
        }
      }
    }`

    fetch('http://127.0.0.1:3001/graphql', {
      headers: {
        "Accept": "application/json",
        "Content-type": "application/json"
      },
      method: 'POST',
      body: JSON.stringify({query,"variables":null,"operationName":null})
    })
      .then( res => res.json() )
      .then( messageData => {
        this.setState({profile: messageData.data.getProfileData[0]});
        console.log(this.state.profile)
        console.log(this.state.profile.outbox)
      })
  };

  componentWillMount() {
    this.handlePassPhrase();
  };

  render() {
    return (
      <div id='ioCardPlatformContainer'>
        <UserData data={this.state.profile} passPhrase={this.state.passPhrase} passPhraseChange={this.handlePassPhrase}/>
        <SendCard data={this.state.profile} passPhrase={this.state.passPhrase} />
        <ReceiveCard data={this.state.profile} />
        <MessageHistory data={this.state.profile} />
      </div>
    );
  }
}

export default IOCardPlatform;
