import React, { Component } from 'react';
import { Card, CardTitle, CardText } from 'react-toolbox/lib/card';
import Button from 'react-toolbox/lib/button/Button';
import Link from 'react-toolbox/lib/link';
import './UserData.css';


class UserData extends Component {

  constructor(props) {
    super(props);
    this.state = { name: '' };
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

          <CardText id='passPhraseContainer'>
            <p>Your Passphrase: </p><Link active href='#'>{this.props.passPhrase}</Link>
            <Button flat primary onClick={this.props.passPhraseChange}>Generate New Passphrase</Button>
          </CardText>

        </Card>
      </div>
    );
  }
}

export default UserData;
