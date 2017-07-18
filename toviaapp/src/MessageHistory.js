import React, { Component } from 'react';
import { Card, CardTitle, CardText } from 'react-toolbox/lib/card';
import './MessageHistory.css';

class MessageHistory extends Component {

  constructor() {
    super();
    this.state = { messagehistory: ''};
  }

  handleChange = (inputKey, value) => {
    this.setState({...this.state, [inputKey]: value});
  };

  render() {
    return (
      <div id="messageHistoryContainer">
        <Card style={{width: '99.85%', height: '330px'}} id='messageHistoryCardContainer'>
          <CardTitle id="cardHeader" title="Tovia's Enigma" subtitle="Message History" />
          <CardText>
            {this.state.messagehistory}
          </CardText>
        </Card>
      </div>
    );
  }
}

export default MessageHistory;
