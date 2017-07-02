import React, { Component } from 'react';
import { Card, CardTitle, CardText } from 'react-toolbox/lib/card';
import Input from 'react-toolbox/lib/input';
import Avatar from 'react-toolbox/lib/avatar/Avatar';
import './UserData.css';

const image = <Avatar style={{backgroundColor: 'deepskyblue'}} icon="folder" />

class UserData extends Component {

  constructor() {
    super();
    this.state = { name: '', message: '', date2: '', encryptdialogueactive: false, decryptdialogueactive: false };
  };

  handleChange = (inputKey, value) => {
    this.setState({...this.state, [inputKey]: value});
  };

  render() {
    return (
      <div id='userDataContainer'>
        <Card style={{width: '350px'}} id='userDataCardContainer'>
          <CardTitle title="Tovia's Enigma" subtitle="Profile Status" />

          <CardText id='profileContainer'>
            <Input required type='text' label='Name' icon={image} onChange={this.handleChange.bind(this, 'name')} value={this.state.name} />
          </CardText>

        </Card>
      </div>
    );
  }
}

export default UserData;
