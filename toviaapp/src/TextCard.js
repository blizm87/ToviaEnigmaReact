import React, { Component } from 'react';
import { Card, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import Button from 'react-toolbox/lib/button/Button';
import Input from 'react-toolbox/lib/input';
import DatePicker from 'react-toolbox/lib/date_picker/DatePicker';
import Dialog from 'react-toolbox/lib/dialog/Dialog';
import Avatar from 'react-toolbox/lib/avatar/Avatar';
import './TextCard.css';

const datetime = new Date(Date.now());
const min_datetime = new Date(new Date(datetime).setDate(8));
const image = <Avatar style={{backgroundColor: 'deepskyblue'}} icon="folder" />

class TextCard extends Component {

  constructor() {
    super();
    this.state = { name: '', message: '', date2: '', active: false };
  }



  handleChange = (inputKey, value) => {
    this.setState({...this.state, [inputKey]: value});
  };

  handleToggle = () => {
    this.setState({active: !this.state.active});
  }

  actions = [
    { label: "Close", onClick: this.handleToggle },
    { label: "Decrypt", onClick: this.handleToggle }
  ];

  render() {
    return (
      <div id='textCardContainer'>
        <Card style={{width: '350px'}} id='cardContainer'>
          <CardTitle title="Tovia's Enigma" />

          <CardText>
            <Input required type='text' label='Name' icon={image} onChange={this.handleChange.bind(this, 'name')} value={this.state.name} />
          </CardText>

          <CardText>
            <Input required multiline type='text' label='Message' onChange={this.handleChange.bind(this, 'message')} value={this.state.message} maxLength={120} />
          </CardText>

          <CardText>
            <DatePicker required sundayFirstDayOfWeek label='Expiration date' minDate={min_datetime} onChange={this.handleChange.bind(this, 'date2')} value={this.state.date2} />
          </CardText>

          <CardActions>
            <Button label="Encrypt" onClick={this.handleToggle} />
            <Button label="Decrypt" onClick={this.handleToggle} />

            <Dialog
              actions={this.actions}
              active={this.state.active}
              onEscKeyDown={this.handleToggle}
              onOverlayClick={this.handleToggle}
              title='De/Encrypt'
            >
              <Input required multiline type='text' label='Message' onChange={this.handleChange.bind(this, 'message')} value={this.state.message} maxLength={120} />
            </Dialog>
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default TextCard;
