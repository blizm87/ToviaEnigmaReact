import React, { Component } from 'react';
import { Card, CardTitle, CardText } from 'react-toolbox/lib/card';
import Avatar from 'react-toolbox/lib/avatar/Avatar';
import Chip from 'react-toolbox/lib/chip/Chip';
import Button from 'react-toolbox/lib/button/Button';
import Link from 'react-toolbox/lib/link';
import './UserData.css';


class UserData extends Component {

  constructor(props) {
    super(props);
    this.state = { allProfiles: '' };
    this.getAllProfiles = this.getAllProfiles.bind(this);
    this.getAllProfiles();
  };

  renderAllProfiles = () => {
    if(typeof this.state.allProfiles === 'object'){
      return(this.state.allProfiles.map( (profile, idx) => {
          if(idx > 0){
            return (
              <div  key={idx}>
                <Chip>
                  <Avatar><img src={profile.imageUrl} alt=''/></Avatar>
                  <span>{profile.displayName}</span>
                </Chip>
              </div>
            );
          } else {
            return null;
          }
        })

      );
    }
  }

  getAllProfiles() {
      const query = `{
        getProfileData {
          displayName
          imageUrl
        }
      }`

      fetch('http://127.0.0.1:3001/graphql', {
        headers: {
          "Accept": "application/json",
          "Content-type": "application/json"
        },
        method: 'POST',
        body: JSON.stringify({query,"variables":null,"operationName":null})
      }).then(  res => res.json() )
        .then( (response) => {
          this.setState({ allProfiles: response.data.getProfileData });
        })
  };

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

          <div id='allProfilesContainer'>
            <h4>Available Profiles to Send Messages To</h4>
            {this.renderAllProfiles()}
          </div>

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
