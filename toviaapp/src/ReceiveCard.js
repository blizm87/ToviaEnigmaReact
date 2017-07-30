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
    this.state = { name: '', message: '', date2: '', decryptdialogueactive: false };
  };

  handleDecryption = () => {
    console.log('decryption completed')
    this.handleDecryptToggle()
  };

  handleChange = (inputKey, value) => {
    this.setState({...this.state, [inputKey]: value});
  };

  handleDecryptToggle = () => {
    this.setState({decryptdialogueactive: !this.state.decryptdialogueactive});
  };

  decryptActions = [
    { label: "Close", onClick: this.handleDecryptToggle },
    { label: "Decrypt", onClick: this.handleDecryption }
  ];

  render() {
    return (
      <div id='receiveContainer'>
        <Card style={{width: '350px'}} id='receiveCardContainer'>
          <CardTitle title="Tovia's Enigma" subtitle="Receive Card" />

          <CardText>
            <Input id="phInput" required type="text"
              label="Passphrase" onChange={this.handleChange.bind(this, "passphrase")}
              value={this.state.passphrase} maxLength={5} />
          </CardText>

          <CardText>
            <Input required multiline type='text' label='Message' onChange={this.handleChange.bind(this, 'message')} value={this.state.message} maxLength={120} />
          </CardText>

          <CardText>
            <DatePicker required sundayFirstDayOfWeek label='Expiration date' minDate={min_datetime} onChange={this.handleChange.bind(this, 'date2')} value={this.state.date2} />
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
              <Input required multiline type='text' label='Message' onChange={this.handleChange.bind(this, 'message')} value={this.state.message} maxLength={120} />
            </Dialog>
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default ReceiveCard;
