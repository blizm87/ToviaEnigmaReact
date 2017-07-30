import React, { Component } from 'react';
import { Card, CardTitle } from 'react-toolbox/lib/card';
import { Table } from 'react-toolbox/lib/table';
// import Button from 'react-toolbox/lib/button/Button';
import './MessageHistory.css';

const UserModelInbox = {
  From: {type: String},
  "Receive Date": {type: String},
  "Expire Date": {type: String},
  Content: {type: String}
};

const UserModelOutbox = {
  To: {type: String},
  PassPhrase: {type: String},
  "Send Date": {type: String},
  "Expire Date": {type: String},
  Content: {type: String}
};

class MessageHistory extends Component {

  constructor(props) {
    super(props);
    this.state = { selected: [], source: 'entry'};
  }

  handleSelect = (selected) => {
    this.setState({selected});
  };

  handleChange = (row, key, value) => {
    const source = this.state.source;
    source[row][key] = value;
    this.setState({source});
  };

  render() {
    return (
      <div id="messageHistoryContainer">
        <Card style={{width: '99.85%', height: '360px'}} id='messageHistoryCardContainer'>
          <CardTitle id="cardHeader" title="Tovia's Enigma" subtitle="Message History" />

          <div id='messageHistoryMainContainer'>
            <div id="inboxContainer">
              <h3>Inbox</h3>
              <h5>{this.props.data.displayName}</h5>
              <Table
                model={UserModelInbox}
                onSelect={this.handleSelect}
                selectable
                selected={this.state.selected}
                source={this.state.source}
              />
            </div>
            <div id="outboxContainer">
              <h3>Outbox</h3>
              <Table
                model={UserModelOutbox}
                onSelect={this.handleSelect}
                selectable
                selected={this.state.selected}
                source={this.state.source}
              />
            </div>
          </div>
        </Card>
      </div>
    );
  }
}

export default MessageHistory;
