import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StatusBar,
} from 'react-native';
import AuthApiService from '../../services/auth-api-service';

export default class LoginForm extends Component {
  static defaultProps = {
    onLoginSuccess: () => {},
  };

  state = {error: null, email: '', password: ''};

  handleSubmitJwtAuth = ev => {
    this.setState({error: null});
    ev.preventDefault();
    const {email, password} = this.state;

    AuthApiService.postLogin({
      email: email.toLowerCase().trim(),
      password: password.trim(),
    })
      .then(res => {
        this.emailInput.clear();
        this.passwordInput.clear();
        this.state.email = '';
        this.state.password = '';
        this.props.onLoginSuccess(res.authToken);
      })
      .catch(res => {
        this.setState({error: res.error});
      });
  };
  componentWillUnmount() {
    this.setState({error: null, email: '', password: ''});
  }
  render() {
    const {error} = this.state;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        {error && <Text>{error}</Text>}
        <TextInput
          style={styles.input}
          placeholder="email"
          placeholderTextColor="rgba(255,255,255,0.7)"
          onSubmitEditing={() => this.passwordInput.focus()}
          returnKeyType="next"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          ref={input => (this.emailInput = input)}
          onChangeText={email => this.setState({email})}
        />
        <TextInput
          style={styles.input}
          placeholder="password"
          secureTextEntry
          placeholderTextColor="rgba(255,255,255,0.7)"
          returnKeyType="go"
          ref={input => (this.passwordInput = input)}
          onSubmitEditing={this.handleSubmitJwtAuth}
          onChangeText={password => this.setState({password})}
        />

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={this.handleSubmitJwtAuth}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: 10,
    color: '#FFF',
    paddingHorizontal: 10,
  },
  buttonContainer: {
    paddingVertical: 15,
    backgroundColor: 'grey',
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#FFF',
  },
});
