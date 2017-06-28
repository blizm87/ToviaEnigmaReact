import React, { Component } from 'react';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import { Button } from 'react-toolbox/lib/button/Button';
import theme from './toolbox/theme.js';
import './TextCard.css';

class TextCard extends Component {

  render() {

    const dummyText = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.';

    return (
      <div id='textCardContainer'>
        <Card style={{width: '350px'}} id='cardContainer'>
          <CardTitle
            avatar="https://placeimg.com/80/80/animals"
            title="Avatar style title"
            subtitle="Subtitle here"
          />
          <CardMedia
            aspectRatio="wide"
            image="https://placeimg.com/800/450/nature"
          />
          <CardTitle
            title="Title goes here"
            subtitle="Subtitle here"
          />
          <CardText>{dummyText}</CardText>
          <CardActions theme={theme}>
            <Button label="Action 1" />
            <Button label="Action 2" />
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default TextCard;
