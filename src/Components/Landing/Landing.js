import React from 'react';
import {Text, View} from 'react-native';

function Landing() {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '50%',
      }}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
        }}>
        Katia
      </Text>
      <View />
      <Text>Find new teammates. Squad up.</Text>
      <Text
        style={{
          textAlign: 'center',
        }}>
        Katia is a social media application made for gamers by gamers. Quickly
        and easily find others who share the same games and platforms as you.
      </Text>
    </View>
  );
}

export default Landing;
