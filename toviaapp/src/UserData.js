import React, { Component } from 'react';
import { Card, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import Button from 'react-toolbox/lib/button/Button';
import Input from 'react-toolbox/lib/input';
import DatePicker from 'react-toolbox/lib/date_picker/DatePicker';
import Dialog from 'react-toolbox/lib/dialog/Dialog';
import Avatar from 'react-toolbox/lib/avatar/Avatar';
import Passphrase from './Passphrase.js';
import './UserData.css';

const datetime = new Date(Date.now());
const min_datetime = new Date(new Date(datetime).setDate(8));
const image = <Avatar style={{backgroundColor: 'deepskyblue'}} icon="folder" />

class UserData extends Component {

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
      <div id='userDataContainer'>
        <Card style={{width: '350px'}} id='userDataCardContainer'>
          <CardTitle title="Tovia's Enigma" subtitle="Profile Status" />

          <CardText id='profileContainer'>
            <Input required type='text' label='Name' icon={image} onChange={this.handleChange.bind(this, 'name')} value={this.state.name} />
          </CardText>

          <CardText>
            <Passphrase />
          </CardText>

        </Card>
      </div>
    );
  }
}

export default UserData;
