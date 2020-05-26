import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Button,
} from 'react-native';
import UserContext from '../../Contexts/UserContext';
import Queue from '../../Utils/Queue';
import SwipeService from '../../services/swipe-service';

export default class Main extends Component {
  state = {queue: null, expanded: false, error: null, loading: false};
  static contextType = UserContext;
  componentDidMount() {
    SwipeService.getPotentialMatches(this.context.user_id)
      .then(potentialMatches => {
        const queue = new Queue();
        potentialMatches.queue.forEach(match => {
          queue.enqueue(match);
        });
        this.setState({queue});
      })
      .catch(error => this.setState({error: error.message}));
  }
  render() {
    return <Text>hello world</Text>;
  }
}
