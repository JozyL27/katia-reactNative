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
        console.log(potentialMatches);
        potentialMatches.queue.forEach(match => {
          console.log(match);
          queue.enqueue(match);
        });
        console.table(`this is before set state: ${queue}`);
        this.setState({queue});
        console.table(`this is after set state: ${queue}`);
      })
      .catch(error => this.setState({error: error.message}));
  }
  render() {
    const {queue} = this.state;
    console.log(`this is at render ${queue}`);
    // const userOne = queue.isEmpty() ? null : queue.peek();
    // console.log(this.context.user_id);
    return (
      <>
        {this.state.error && (
          <Text style={styles.error}>{this.state.error}</Text>
        )}
        {/* <Text>{userOne.display_name}</Text> */}
        {/* <Text>hello world</Text> */}
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
