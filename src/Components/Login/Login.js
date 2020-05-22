import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Button,
} from 'react-native';
import LoginForm from './LoginForm';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default class Login extends Component {
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.logoContainer}>
          <Text style={styles.name}>Katia</Text>
        </View>
        <View style={styles.formContainer}>
          <LoginForm />
        </View>
        <Text style={styles.question}>Don't have an account?</Text>
        <TouchableOpacity
          title="SignUp"
          style={styles.signupLink}
          onPress={() => this.props.navigation.navigate('SignUp')}>
          <Text style={styles.buttonText}>SignUp</Text>
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
  signupLink: {
    padding: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
  },
});
