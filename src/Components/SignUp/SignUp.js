import React, {Component} from 'react';
import {StyleSheet, View, Text, KeyboardAvoidingView} from 'react-native';
import t from 'tcomb-form-native';

const Form = t.form.Form;

const User = t.struct({
  email: t.String,
  username: t.String,
  password: t.String,
});

export default class SignUp extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Form type={User} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#fff',
  },
});
