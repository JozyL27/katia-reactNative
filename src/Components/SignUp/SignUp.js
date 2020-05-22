import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import SignUpForm from './SignUpForm';

export default class SignUp extends Component {
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.logoContainer}>
          <Text style={styles.name}>Katia</Text>
        </View>
        <View style={styles.formContainer}>
          <SignUpForm />
        </View>
        <Text style={styles.question}>Already have an account?</Text>
        <TouchableOpacity
          title="Login"
          style={styles.loginLink}
          onPress={() => this.props.navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(76, 201, 240)',
  },
  name: {
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
  },
  logoContainer: {
    marginTop: '50%',
  },
  question: {
    textAlign: 'center',
    color: '#fff',
  },
  loginLink: {
    padding: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
  },
});
