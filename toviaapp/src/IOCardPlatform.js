import React, { Component } from 'react';
import { Card, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import Button from 'react-toolbox/lib/button/Button';
import Input from 'react-toolbox/lib/input';
import DatePicker from 'react-toolbox/lib/date_picker/DatePicker';
import Dialog from 'react-toolbox/lib/dialog/Dialog';
import Avatar from 'react-toolbox/lib/avatar/Avatar';
import UserData from './UserData.js';
import ReceiveCard from './ReceiveCard.js';
import './IOCardPlatform.css';

const datetime = new Date(Date.now());
const min_datetime = new Date(new Date(datetime).setDate(8));
const image = <Avatar style={{backgroundColor: 'deepskyblue'}} icon="folder" />

class IOCardPlatform extends Component {

  constructor() {
    super();
    this.state = { name: '', message: '', date2: '', encryptdialogueactive: false, decryptdialogueactive: false };
  };

  handleEncryption = () => {
    console.log('encryption completed')
    this.handleEncryptToggle()
  };

  handleDecryption = () => {
    console.log('decryption completed')
    this.handleDecryptToggle()
  };

  handleChange = (inputKey, value) => {
    this.setState({...this.state, [inputKey]: value});
  };

  handleEncryptToggle = () => {
    this.setState({encryptdialogueactive: !this.state.encryptdialogueactive});
  };

  handleDecryptToggle = () => {
    this.setState({decryptdialogueactive: !this.state.decryptdialogueactive});
  };

  encryptActions = [
    { label: "Close", onClick: this.handleEncryptToggle },
    { label: "Encrypt", onClick: this.handleEncryption }
  ];

  decryptActions = [
    { label: "Close", onClick: this.handleDecryptToggle },
    { label: "Decrypt", onClick: this.handleDecryption }
  ];

  render() {
    return (
      <div id='ioCardPlatformContainer'>
        <Card style={{width: '350px'}} id='sendCardContainer'>
          <CardTitle title="Tovia's Enigma" subtitle="Send Card" />

          <CardText>
            <Input id="phInput" required style={{width:"100px"}}
              type="text" placeholder="Passphrase" label="Passphrase" onChange={this.handleChange.bind(this, "passphrase")}
              value={this.state.passphrase} maxLength={5} />
          </CardText>

          <CardText>
            <Input required multiline type='text' label='Message' onChange={this.handleChange.bind(this, 'message')} value={this.state.message} maxLength={120} />
          </CardText>

          <CardText>
            <DatePicker required sundayFirstDayOfWeek label='Expiration date' minDate={min_datetime} onChange={this.handleChange.bind(this, 'date2')} value={this.state.date2} />
          </CardText>

          <CardActions>
            <Button label="Encrypt" onClick={this.handleEncryptToggle} />
            <Button label="Decrypt" onClick={this.handleDecryptToggle} />

            <Dialog
              actions={this.encryptActions}
              active={this.state.encryptdialogueactive}
              onEscKeyDown={this.handleEncryptToggle}
              onOverlayClick={this.handleEncryptToggle}
              title='Encrypt Message'
            >
              <Input required multiline type='text' label='Message' onChange={this.handleChange.bind(this, 'message')} value={this.state.message} maxLength={120} />
            </Dialog>

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

        <UserData />
        <ReceiveCard />
      </div>
    );
  }
}

export default IOCardPlatform;
