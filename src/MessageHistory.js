import React, { Component } from 'react';
import { Card, CardTitle, CardText } from 'react-toolbox/lib/card';
import { Table, TableHead, TableRow, TableCell } from 'react-toolbox/lib/table';
import './MessageHistory.css';

class MessageHistory extends Component {

  constructor(props) {
    super(props);
    this.state = {
      profile: this.props.data, inbox: this.props.inbox, outbox: this.props.outbox
    };
  }

  handleSelect = (num, value) => {
    let counterRow;
    if(num === 0 ){
      counterRow = document.querySelectorAll('Table>tbody')[1].querySelectorAll('tr');
    } else {
      counterRow = document.querySelectorAll('Table>tbody')[0].querySelectorAll('tr');
    }
    let allRows = document.querySelectorAll('Table>tbody')[num].querySelectorAll('tr');
    let target = document.querySelectorAll('Table>tbody')[num].querySelectorAll('tr>td>label>div')[value];
    for(var i = 0; i < counterRow.length; i++){
      counterRow[i].querySelector('td>label>div').className = '_1CXAo';
    }
    for(var j = 0; j < allRows.length; j++){
      if(j !== value[0]) {
        allRows[j].querySelector('td>label>div').className = '_1CXAo';
      }
    }
    if(target.className === '_1CXAo'){
      target.className = '_1CXAo nSz7s';
      this.props.selectMessage(num, value, 1);
    } else {
      target.className = '_1CXAo';
      this.props.selectMessage(num, value, 0);
    }
  };

  createInboxTable = () => {
    if(typeof this.props.inbox === 'object') {
        return (this.props.inbox.map((item, idx) =>
          <TableRow key={idx}>
            <TableCell>{item.From}</TableCell>
            <TableCell>{new Date(item.ReceiveDate).toDateString()}</TableCell>
            <TableCell>{new Date(item.ExpireDate).toDateString()}</TableCell>
          </TableRow>
        ));
    }
  };

  createOutboxTable = () => {
    if(typeof this.props.outbox === 'object') {
        return (this.props.outbox.map((item, idx) =>
          <TableRow key={idx}>
            <TableCell>{item.sentTo}</TableCell>
            <TableCell>{item.PassPhrase}</TableCell>
            <TableCell>{new Date(item.SendDate).toDateString()}</TableCell>
            <TableCell>{new Date(item.ExpireDate).toDateString()}</TableCell>
          </TableRow>
        ));
    }
  };

  render() {
    return (
      <div id="messageHistoryContainer">
        <Card id='messageHistoryCardContainer'>
          <CardTitle id="cardHeader" title="Justin's Enigma" subtitle="Message History" />
          <CardText>
            <div id='messageHistoryMainContainer'>
              <div id="inboxContainer">
                <h3>Inbox</h3>
                <Table onRowSelect={this.handleSelect.bind(this, 0)}>
                  <TableHead>
                    <TableCell className='inboxTdWidth'>From</TableCell>
                    <TableCell className='inboxTdWidth'>Date Received</TableCell>
                    <TableCell className='inboxTdWidth'>Expire Date</TableCell>
                  </TableHead>
                  {this.createInboxTable()}
                </Table>
              </div>
              <div id="outboxContainer">
                <h3>Outbox</h3>
                <Table onRowSelect={this.handleSelect.bind(this, 1)}>
                  <TableHead>
                    <TableCell className='outboxTdWidth'>Send To</TableCell>
                    <TableCell className='outboxTdWidth'>PassPhrase</TableCell>
                    <TableCell className='outboxTdWidth'>Date Sent</TableCell>
                    <TableCell className='outboxTdWidth'>Expire Date</TableCell>
                  </TableHead>
                  {this.createOutboxTable()}
                </Table>
              </div>
            </div>
          </CardText>
        </Card>
      </div>
    );
  }
}

export default MessageHistory;
