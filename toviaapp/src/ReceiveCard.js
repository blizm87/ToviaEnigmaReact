import React, { Component } from 'react';
import { Card, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import Button from 'react-toolbox/lib/button/Button';
import Input from 'react-toolbox/lib/input';
import DatePicker from 'react-toolbox/lib/date_picker/DatePicker';
import Dialog from 'react-toolbox/lib/dialog/Dialog';
import './ReceiveCard.css';

const datetime = new Date(Date.now());
const min_datetime = new Date(new Date(datetime).setDate(8));

class ReceiveCard extends Component {

  constructor(props) {
    super(props);
    this.state = { passPhrase: '', date2: '', decryptedMessage: props.activeMessage.content, decryptdialogueactive: false };
  };

  getDate2 = () => {
    if(typeof this.props.activeMessage === 'object'){
      return new Date(this.props.activeMessage.ExpireDate);
    }
    return this.state.date2;
  }

  handleDecryption = () => {
    console.log('decryption completed')
    fetch(`http://127.0.0.1:3001/profile/decrypt/${this.state.passPhrase}`, {
      headers: {
        "Accept": "application/json",
        "Content-type": "application/json"
      },
      method: 'POST',
      body: JSON.stringify({
        content: this.state.decryptedMessage
      })
    }).then(res => res.json())
      .then( response => {
        console.log(response.data)
        console.log(response.notice)
        this.setState({decryptedMessage: response.data})
      })
  };

  handleChange = (inputKey, value) => {
    this.setState({...this.state, [inputKey]: value});
  };

  handleDecryptToggle = () => {
    this.setState({
      decryptedMessage: this.props.activeMessage.content,
      decryptdialogueactive: !this.state.decryptdialogueactive
    });
  };

  decryptActions = [
    { label: "Close", onClick: this.handleDecryptToggle },
    { label: "Decrypt", onClick: this.handleDecryption }
  ];

  render() {
    return (
      <div id='receiveContainer'>
        <Card style={{width: '350px'}} id='receiveCardContainer'>
          <CardTitle title="Tovia's Enigma" subtitle="Selected Message Card" />

          <CardText>
            <Input id="phInput" required type="text"
              label="Passphrase" onChange={this.handleChange.bind(this, "passPhrase")}
              value={this.state.passPhrase} maxLength={5} />
          </CardText>

          <CardText id='inputMessageContainer'>
            <Input required multiline type='text' label='Message' value={this.props.activeMessage.content} maxLength={120} />
          </CardText>

          <CardText>
            <DatePicker required sundayFirstDayOfWeek disabled label='Expiration date' minDate={min_datetime} value={this.getDate2()} />
          </CardText>

          <CardActions>
            <Button label="Decrypt" onClick={this.handleDecryptToggle} />

            <Dialog
              actions={this.decryptActions}
              active={this.state.decryptdialogueactive}
              onEscKeyDown={this.handleDecryptToggle}
              onOverlayClick={this.handleDecryptToggle}
              title='Decrypt Message'
            >
              <Input required multiline type='text' label='Message' value={this.state.decryptedMessage} maxLength={120} />
            </Dialog>
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default ReceiveCard;
