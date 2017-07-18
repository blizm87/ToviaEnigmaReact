import React, { Component } from 'react';
import { Card, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import Button from 'react-toolbox/lib/button/Button';
import Input from 'react-toolbox/lib/input';
import DatePicker from 'react-toolbox/lib/date_picker/DatePicker';
import Dialog from 'react-toolbox/lib/dialog/Dialog';
import UserData from './UserData.js';
import ReceiveCard from './ReceiveCard.js';
import MessageHistory from './MessageHistory.js';
import './IOCardPlatform.css';

const datetime = new Date(Date.now());
const min_datetime = new Date(new Date(datetime).setDate(8));

class IOCardPlatform extends Component {

  constructor() {
    super();
    this.state = { profile: '', message: '', date2: '', encryptdialogueactive: false };
  };

  handleProfileData = () => {
    let urlParams = new URLSearchParams(window.location.search);
    let paramRes = urlParams.get('userId')
    fetch(`http://127.0.0.1:3001/profile?userId=${paramRes}`)
      .then( res => res.json() )
      .then( profiledata => {
        console.log('HELLO JKS')
        console.log(profiledata.data[0])
        this.setState({profile: profiledata.data[0]});
      })
  };

  handleEncryption = () => {
    console.log('encryption completed')
    this.handleEncryptToggle()
  };

  handleChange = (inputKey, value) => {
    this.setState({...this.state, [inputKey]: value});
  };

  handleEncryptToggle = () => {
    this.setState({encryptdialogueactive: !this.state.encryptdialogueactive});
  };

  encryptActions = [
    { label: "Close", onClick: this.handleEncryptToggle },
    { label: "Encrypt", onClick: this.handleEncryption }
  ];

  componentWillMount() {
    this.handleProfileData()
  };

  render() {
    return (
      <div id='ioCardPlatformContainer'>
        <Card style={{width: '350px'}} id='sendCardContainer'>
          <CardTitle title="Tovia's Enigma" subtitle="Send Card" />

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
            <Button label="Encrypt" onClick={this.handleEncryptToggle} />

            <Dialog
              actions={this.encryptActions}
              active={this.state.encryptdialogueactive}
              onEscKeyDown={this.handleEncryptToggle}
              onOverlayClick={this.handleEncryptToggle}
              title='Encrypt Message'
            >
              <Input required multiline type='text' label='Message' onChange={this.handleChange.bind(this, 'message')} value={this.state.message} maxLength={120} />
            </Dialog>
          </CardActions>
        </Card>

        <UserData data={this.state.profile} />
        <ReceiveCard />
        <MessageHistory />
      </div>
    );
  }
}

export default IOCardPlatform;
