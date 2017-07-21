import React, { Component } from 'react';
import { Card, CardTitle, CardText } from 'react-toolbox/lib/card';
import Button from 'react-toolbox/lib/button/Button';
import './UserData.css';


class UserData extends Component {

  constructor() {
    super();
    this.state = { name: '', newPassPhrase: '' };
  };

  // handleChange = (inputKey, value) => {
  //   this.setState({...this.state, [inputKey]: value});
  // };

  render() {
    return (
      <div id='userDataContainer'>
        <Card style={{width: '350px'}} id='userDataCardContainer'>
          <CardTitle title="Tovia's Enigma" subtitle="Profile Status" />

          <CardTitle id='profileContainer'
            avatar={this.props.data.imageUrl}
            title={this.props.data.displayName}
            subtitle={this.props.data.gender}
          />

          <CardText>
            <p>Your Passphrase - <Button flat primary>{this.props.passPhrase}</Button></p>
            <Button flat primary>Generate New Passphrase</Button>
          </CardText>

        </Card>
      </div>
    );
  }
}

export default UserData;
