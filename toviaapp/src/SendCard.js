import React, { Component } from 'react';
import { Card, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import Button from 'react-toolbox/lib/button/Button';
import Input from 'react-toolbox/lib/input';
import DatePicker from 'react-toolbox/lib/date_picker/DatePicker';
import Dialog from 'react-toolbox/lib/dialog/Dialog';
import './SendCard.css';

const datetime = new Date(Date.now());
const min_datetime = new Date(datetime);

// new Date(datetime).setDate(datetime.getDate())

class SendCard extends Component {

  constructor(props) {
    super(props);
    this.state = { name: '', message: '', encryptedMessage: '',
     date2: '', sendTo: '', encryptdialogueactive: false };
  };

  handleEncryption = () => {
    this.handleEncryptToggle()
    fetch(`http://127.0.0.1:3001/profile/${this.props.data.userId}`, {
      headers: {
        "Accept": "application/json",
        "Content-type": "application/json"
      },
      method: 'POST',
      body: JSON.stringify({
        toUser: this.state.sendTo,
        fromUser: this.props.data.displayName,
        passPhrase: this.props.passPhrase,
        content: this.state.encryptedMessage,
        expireDate: this.state.date2
      })
    }).then(function(res){  console.log(res)  })
    this.setState({
      sendTo: '',
      message: '',
      encryptedMessage: '',
      date2: ''
    })
    this.props.getInOutBox();
  };

  handleChange = (inputKey, value) => {
    this.setState({...this.state, [inputKey]: value});
  };

  handleEncryptToggle = () => {
    let encryptionResult = btoa(this.state.message)
    this.setState({
      encryptedMessage: encryptionResult,
      encryptdialogueactive: !this.state.encryptdialogueactive
    });
  };

  encryptActions = [
    { label: "Close", onClick: this.handleEncryptToggle },
    { label: "Send", onClick: this.handleEncryption }
  ];

  render() {
    return (
      <div id='sendContainer'>
        <Card style={{width: '350px'}} id='sendCardContainer'>
          <CardTitle title="Tovia's Enigma" subtitle="Send Card" />

          <CardText>
            <Input id="messageTo" required type="text"
              label="Send To" onChange={this.handleChange.bind(this, "sendTo")} value={this.state.sendTo} />
          </CardText>

          <CardText>
            <Input required multiline type='text' label='Message' onChange={this.handleChange.bind(this, 'message')} value={this.state.message} maxLength={120} />
          </CardText>

          <CardText>
            <DatePicker required sundayFirstDayOfWeek label='Expiration date' minDate={min_datetime} onChange={this.handleChange.bind(this, 'date2')} value={this.state.date2} />
          </CardText>

          <CardActions>
            <Button label="Encrypt" onClick={this.handleEncryptToggle} />

            <Dialog
              actions={this.encryptActions}
              active={this.state.encryptdialogueactive}
              onEscKeyDown={this.handleEncryptToggle}
              onOverlayClick={this.handleEncryptToggle}
              title='Encrypt Message'
            >
              <Input required multiline type='text' label='Message' onChange={this.handleChange.bind(this, 'encryptedMessage')} value={this.state.encryptedMessage} maxLength={120} />
            </Dialog>
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default SendCard;
