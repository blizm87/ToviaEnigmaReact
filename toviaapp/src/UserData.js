import React, { Component } from 'react';
import { Card, CardTitle } from 'react-toolbox/lib/card';
import './UserData.css';


class UserData extends Component {

  constructor() {
    super();
    this.state = { name: '', message: '', date2: '', encryptdialogueactive: false, decryptdialogueactive: false };
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

        </Card>
      </div>
    );
  }
}

export default UserData;
