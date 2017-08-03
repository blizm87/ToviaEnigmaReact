import React, { Component } from 'react';
import SendCard from './SendCard.js';
import UserData from './UserData.js';
import ReceiveCard from './ReceiveCard.js';
import MessageHistory from './MessageHistory.js';
import './IOCardPlatform.css';

class IOCardPlatform extends Component {

  constructor() {
    super();
    this.state = { profile: '', passPhrase: '', userInbox: '', userOutbox: '', activeMessage: '' };
    this.handleProfileData = this.handleProfileData.bind(this);
    this.handleProfileData();

  };

  handleMessageSelect = (boxNum, rowNum, trigger) => {
    if(trigger !== 0) {
      if(boxNum === 0){
        this.setState({ activeMessage: this.state.userInbox[rowNum] });
      } else {
        this.setState({ activeMessage: this.state.userOutbox[rowNum] });
      }
    } else {
      this.setState({ activeMessage: {content: '', ExpireDate: '', PassPhrase: ''} });
    }
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
    const query = `{
      getProfileData(userId: \"${paramRes}\") {
        userId
        displayName
        gender
        imageUrl
        inbox {
          fromUser
          passPhrase
          content
          expireDate
          createdAt
        }
        outbox {
          toUser
          passPhrase
          content
          expireDate
          createdAt
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
        let result = messageData.data.getProfileData[0];
        let outboxEntry = [];
        for(var i = result.outbox.length - 1; i >= 0; i--){
          outboxEntry.push({
            sentTo: result.outbox[i].toUser,
            PassPhrase: result.outbox[i].passPhrase,
            content: result.outbox[i].content,
            SendDate: result.outbox[i].createdAt,
            ExpireDate: result.outbox[i].expireDate
          })
        }
        let inboxEntry = [];
        for(var j = result.inbox.length - 1; j >= 0; j--){
          inboxEntry.push({
            From: result.inbox[j].fromUser,
            PassPhrase: result.inbox[j].passPhrase,
            content: result.inbox[j].content,
            ReceiveDate: result.inbox[j].createdAt,
            ExpireDate: result.inbox[j].expireDate
          })
        }
        this.setState({
          profile: result,
          userInbox: inboxEntry,
          userOutbox: outboxEntry
        });
      })
  };

  componentWillMount() {
    this.handlePassPhrase();
  };

  render() {
    return (
      <div id='ioCardPlatformContainer'>
        <UserData data={this.state.profile} passPhrase={this.state.passPhrase}
         passPhraseChange={this.handlePassPhrase} />
        <SendCard data={this.state.profile} passPhrase={this.state.passPhrase}
         getInOutBox={this.handleProfileData} />
        <ReceiveCard data={this.state.profile} activeMessage={this.state.activeMessage} />
        <MessageHistory data={this.state.profile} inbox={this.state.userInbox}
         outbox={this.state.userOutbox} selectMessage={this.handleMessageSelect} />
      </div>
    );
  }
}

export default IOCardPlatform;
