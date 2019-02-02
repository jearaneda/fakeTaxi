import React from 'react';
import { StyleSheet, Text, View, TextInput, ImageBackground, ActivityIndicator,Image } from 'react-native';
import { Button } from 'react-native-elements'
export default class App extends React.Component {

  constructor(props){

    super(props);
  //  this.registerUser("test@mail.com", "123456");
   this.state = {
     validez : '',
   };



  }



handlePress = async (patente) => {
  this.setState({validez: 'Waiting...'})
  fetch('https://2ooxqqwn6g.execute-api.us-east-2.amazonaws.com/dev', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
       'username' : patente
      })
})
    .then((response) => response.json())
    .then((responseJson) => {
    this.setState({validez: responseJson})
    })
    .catch((error) => {
      console.error(error);
    });
}


  render() {
    if (this.state.validez == 'Waiting...') {
      return (

        <ImageBackground style={styles.container} source={require('./assets/cagaste.jpeg')}>
        <ActivityIndicator
          animating={true}
          style={styles.indicator}
          size="large"
        />

         <Text
          style={{
       textAlignVertical: "center",
       textAlign: "center", justifyContent: 'center', flex: 1, color : 'white'
     }} > Altiro te analizo la patente, compadre </Text>

        </ImageBackground>

      );
    }


    return (
      <ImageBackground source={require('./assets/mustard.jpg')} style={styles.container}>
        <Text>Ingresa la patente y el Tío Emilio la revisará</Text>

<TextInput
  placeholder='AABB12'
  onChangeText={(text) => this.setState({patente: text})}
  style={{height: 60, fontSize : 35}}
/>

<Button color='white'  buttonStyle={{
    backgroundColor: "rgba(0, 0,0, 1)",
    width: 300,
    height: 45,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 5
  }}
onPress = {() => this.handlePress(this.state.patente)} title = "Revisemos la patente! "/>


<Text style = {{justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}> {this.state.validez}</Text>

      </ImageBackground>


    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 80
  },
});
