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
    this.state = { passPhrase: '', date2: '', decryptedMessage: props.activeMessage.content,
     decryptdialogueactive: false, errordialogueactive: false, errornoobjectdialogueactive: false,
     expirationexceededdialogueactive: false
    };
  };

  getDate2 = () => {
    if(typeof this.props.activeMessage === 'object'){
      if(this.props.activeMessage.ExpireDate !== ''){
        return new Date(this.props.activeMessage.ExpireDate);
      } else {
        return this.state.date2;
      }
    }
    return this.state.date2;
  }

  handleDecryption = () => {
    fetch(`https://nameless-brook-20005.herokuapp.com/profile/decrypt/${this.state.passPhrase}`, {
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
        this.setState({decryptedMessage: response.data})
      })
  };

  handleChange = (inputKey, value) => {
    this.setState({...this.state, [inputKey]: value});
  };

  handleDecryptToggle = () => {
    if(typeof this.props.activeMessage === 'object'){
      if(this.props.activeMessage.PassPhrase === this.state.passPhrase && this.state.passPhrase !== ''){
        if(Date.now() >= new Date(this.props.activeMessage.ExpireDate).getTime()){
          this.setState({
            expirationexceededdialogueactive: !this.state.expirationexceededdialogueactive
          })
        } else {
            this.setState({
              decryptedMessage: this.props.activeMessage.content,
              decryptdialogueactive: !this.state.decryptdialogueactive
            });
          }
      } else if(this.props.activeMessage.PassPhrase === '' && this.props.activeMessage.ExpireDate === '' && this.props.activeMessage.content === '') {
          this.setState({
            errornoobjectdialogueactive: !this.state.errornoobjectdialogueactive
          });
        } else {
            this.setState({
              errordialogueactive: !this.state.errordialogueactive
            })
          }
    } else {
      console.log('hello')
      this.setState({
        errornoobjectdialogueactive: !this.state.errornoobjectdialogueactive
      })
    }
  };

  decryptActions = [
    { label: "Close", onClick: this.handleDecryptToggle },
    { label: "Decrypt", onClick: this.handleDecryption }
  ];

  errorActions = [
    { label: "Close", onClick: this.handleDecryptToggle }
  ]

  errorNoObjectActions = [
    { label: "Close", onClick: this.handleDecryptToggle }
  ]

  expirationExceededActions = [
    { label: "Close", onClick: this.handleDecryptToggle }
  ]

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

            <Dialog
              actions={this.errorActions}
              active={this.state.errordialogueactive}
              onEscKeyDown={this.handleDecryptToggle}
              onOverlayClick={this.handleDecryptToggle}
              title='Error Message'
            >
              <Input required multiline type='text' label='Message'
               value='Your PassPhrase is incorrect. Please exit and try again.' />
            </Dialog>

            <Dialog
              actions={this.errorNoObjectActions}
              active={this.state.errornoobjectdialogueactive}
              onEscKeyDown={this.handleDecryptToggle}
              onOverlayClick={this.handleDecryptToggle}
              title='Error Message'
            >
              <Input required multiline type='text' label='Message'
               value='A message has not been selected. Please select a message from Message History' />
            </Dialog>

            <Dialog
              actions={this.expirationExceededActions}
              active={this.state.expirationexceededdialogueactive}
              onEscKeyDown={this.handleDecryptToggle}
              onOverlayClick={this.handleDecryptToggle}
              title='Error Message'
            >
              <Input required multiline type='text' label='Message'
               value='The expiration date on this message has expired. This message is no longer decryptable.' />
            </Dialog>
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default ReceiveCard;
