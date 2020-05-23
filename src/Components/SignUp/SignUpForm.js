import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import TokenService from '../../services/token-service';
import AuthService from '../../services/auth-api-service';

export default class LoginForm extends Component {
  static defaultProps = {
    onRegistrationSuccess: () => {},
  };
  state = {error: null, email: '', display_name: '', password: ''};

  // have to add ref to inputs to clear them
  // add loading after press of button or send user to login on press

  handleSubmit = ev => {
    this.setState({error: null});
    ev.preventDefault();
    const {email, display_name, password} = this.state;
    const user = {
      email: email.toLowerCase(),
      display_name: display_name,
      password: password,
    };
    console.log(user);

    AuthService.registerUser(user)
      .then(() => {
        AuthService.postLogin({
          email: email.toLowerCase().trim(),
          password: password,
        })
          .then(res => {
            this.emailInput.clear();
            this.usernameInput.clear();
            this.passwordInput.clear();
            this.state.email = '';
            this.state.display_name = '';
            this.state.password = '';
            TokenService.saveAuthToken(res.authToken);
            this.props.onRegistrationSuccess();
          })
          .catch(error => this.setState({error: error.message}));
      })
      .catch(res => {
        this.setState({error: res.error});
      });
  };

  render() {
    const {error} = this.state;
    return (
      <View style={styles.container}>
        {error && <Text>{error}</Text>}
        <TextInput
          style={styles.input}
          placeholder="email"
          placeholderTextColor="rgba(255,255,255,0.7)"
          onSubmitEditing={() => this.usernameInput.focus()}
          returnKeyType="next"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          ref={input => (this.emailInput = input)}
          onChangeText={email => this.setState({email})}
        />

        <TextInput
          style={styles.input}
          placeholder="username"
          placeholderTextColor="rgba(255,255,255,0.7)"
          onSubmitEditing={() => this.passwordInput.focus()}
          returnKeyType="next"
          autoCapitalize="none"
          autoCorrect={false}
          ref={input => (this.usernameInput = input)}
          onChangeText={display_name => this.setState({display_name})}
        />

        <TextInput
          style={styles.input}
          placeholder="password"
          secureTextEntry
          placeholderTextColor="rgba(255,255,255,0.7)"
          returnKeyType="go"
          ref={input => (this.passwordInput = input)}
          onChangeText={password => this.setState({password})}
        />

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={this.handleSubmit}>
          <Text style={styles.buttonText}>SignUp</Text>
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
