import React, { Component } from 'react';
import { Card, CardTitle, CardText } from 'react-toolbox/lib/card';
import { Table, TableHead, TableRow, TableCell } from 'react-toolbox/lib/table';
import './MessageHistory.css';

class MessageHistory extends Component {

  constructor(props) {
    super(props);
    this.state = { profile: this.props.data, selected: [], inbox: this.props.inbox, outbox: this.props.outbox};
  }

  handleSelect = (selected) => {
    this.setState({selected});
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
        <Card style={{width: '99.85%', height: '360px'}} id='messageHistoryCardContainer'>
          <CardTitle id="cardHeader" title="Tovia's Enigma" subtitle="Message History" />
          <CardText>
            <div id='messageHistoryMainContainer'>
              <div id="inboxContainer">
                <h3>Inbox</h3>
                <Table>
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
                <Table>
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
