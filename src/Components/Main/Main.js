import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Button,
  Image,
} from 'react-native';
import UserContext from '../../Contexts/UserContext';
import Queue from '../../Utils/Queue';
import SwipeService from '../../services/swipe-service';

export default class Main extends Component {
  state = {queue: new Queue(), expanded: false, error: null, loading: false};
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
    const queue = this.state.queue;
    const userOne = queue.isEmpty() ? null : queue.peek();
    // console.log(userOne);
    return (
      <>
        {this.state.error && (
          <Text style={styles.error}>{this.state.error}</Text>
        )}
        {userOne && (
          <>
            <Text style={{textAlign: 'center', marginTop: '50%'}}>
              {userOne.display_name}
            </Text>
            <Image source={{uri: userOne.avatar}} style={{width: 200, height: 200}}/>
          </>
        )}
      </>
    );
  }
}

const styles = StyleSheet.create({
  error: {
    marginTop: 30,
    textAlign: 'center',
    color: 'black',
  },
});
