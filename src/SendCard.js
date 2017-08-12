import React, { Component } from 'react';
import { Card, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import Button from 'react-toolbox/lib/button/Button';
import Input from 'react-toolbox/lib/input';
import DatePicker from 'react-toolbox/lib/date_picker/DatePicker';
import Dialog from 'react-toolbox/lib/dialog/Dialog';
import './SendCard.css';

const datetime = new Date(Date.now());
const min_datetime = new Date(datetime);

class SendCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      message: '', date2: '', sendTo: '', sendToUser: '',
      encryptdialogueactive: false, errordialogueactive: false, errorsendtodialogueactive: false
    };
  };

  handleEncryption = () => {
    if(window.location.hostname === '127.0.0.1') {
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
          content: this.state.message,
          expireDate: this.state.date2
        })
      }).then(function(res){  console.log(res)  })
    } else {
        fetch(`https://nameless-brook-20005.herokuapp.com/profile/${this.props.data.userId}`, {
          headers: {
            "Accept": "application/json",
            "Content-type": "application/json"
          },
          method: 'POST',
          body: JSON.stringify({
            toUser: this.state.sendTo,
            fromUser: this.props.data.displayName,
            passPhrase: this.props.passPhrase,
            content: this.state.message,
            expireDate: this.state.date2
          })
        }).then(function(res){  console.log(res)  })
    }

    this.setState({
      sendTo: '',
      message: '',
      encryptedMessage: '',
      date2: '',
      encryptdialogueactive: !this.state.encryptdialogueactive
    })
    this.props.getInOutBox();
  };

  handleChange = (inputKey, value) => {
    this.setState({...this.state, [inputKey]: value});
  };

  handleEncryptToggle = () => {
    if(this.state.date2 !== '' && this.state.message !== ''){
      const query = `{
        getProfileData {
          displayName
          imageUrl
        }
      }`

      if(window.location.hostname === '127.0.0.1'){
        fetch('http://127.0.0.1:3001/graphql', {
          headers: {
            "Accept": "application/json",
            "Content-type": "application/json"
          },
          method: 'POST',
          body: JSON.stringify({query,"variables":null,"operationName":null})
        }).then(  res => res.json() )
          .then( (response) => {
            response.data.getProfileData.map( (profile) => {
              if(this.state.sendTo === profile.displayName){
                this.setState({ sendToUser: profile.displayName });
              }
              return null;
            })
              if(this.state.sendTo === this.state.sendToUser && this.state.sendTo !== ''){
                this.setState({
                  sendToUser: '',
                  encryptdialogueactive: !this.state.encryptdialogueactive
                });
              } else {
                this.setState({
                  errorsendtodialogueactive: !this.state.errorsendtodialogueactive
                });
              }
          })
      } else {
          fetch('https://nameless-brook-20005.herokuapp.com/graphql', {
            headers: {
              "Accept": "application/json",
              "Content-type": "application/json"
            },
            method: 'POST',
            body: JSON.stringify({query,"variables":null,"operationName":null})
          }).then(  res => res.json() )
            .then( (response) => {
              response.data.getProfileData.map( (profile) => {
                if(this.state.sendTo === profile.displayName){
                  this.setState({ sendToUser: profile.displayName });
                }
                return null;
              })
                if(this.state.sendTo === this.state.sendToUser && this.state.sendTo !== ''){
                  this.setState({
                    sendToUser: '',
                    encryptdialogueactive: !this.state.encryptdialogueactive
                  });
                } else {
                  this.setState({
                    errorsendtodialogueactive: !this.state.errorsendtodialogueactive
                  });
                }
            })
      }
    } else {
        this.setState({
          errordialogueactive: !this.state.errordialogueactive
        })
    }
  };

  encryptActions = [
    { label: "Close", onClick: () => this.setState({encryptdialogueactive: !this.state.encryptdialogueactive}) },
    { label: "Send", onClick: this.handleEncryption }
  ];

  errorActions = [
    { label: "Close", onClick: this.handleEncryptToggle }
  ];

  errorSendToActions = [
    { label: "Close", onClick: () => this.setState({errorsendtodialogueactive: !this.state.errorsendtodialogueactive})  }
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
              onEscKeyDown={() => this.setState({encryptdialogueactive: !this.state.encryptdialogueactive})}
              onOverlayClick={() => this.setState({encryptdialogueactive: !this.state.encryptdialogueactive})}
              title='Encrypt Message'
            >
              <Input required multiline type='text' label='Message' value={this.state.message} maxLength={120} />
            </Dialog>

            <Dialog
              actions={this.errorActions}
              active={this.state.errordialogueactive}
              onEscKeyDown={this.handleEncryptToggle}
              onOverlayClick={this.handleEncryptToggle}
              title='Error Message'
            >
              <Input required multiline type='text' label='Message'
               value='An error has occured. Expiration date or message cannot be blank.
                Please exit and try again.' />
            </Dialog>

            <Dialog
              actions={this.errorSendToActions}
              active={this.state.errorsendtodialogueactive}
              onEscKeyDown={this.handleEncryptToggle}
              onOverlayClick={this.handleEncryptToggle}
              title='Error Message'
            >
              <Input required multiline type='text' label='Message'
               value='A proper profile name must be entered into the "Send To" input
                Please double check spelling of the profile name because spelling "Is" case
                sensative.' />
            </Dialog>

          </CardActions>
        </Card>
      </div>
    );
  }
}

export default SendCard;
