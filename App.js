import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import {Constants, Location, Permissions } from 'expo';
 
export default class App extends React.Component {

  //state the initial state of the location 
  state = {

    location: null, 
    errorMessage: null,
  };

  //mounting the component before running 
  componentWillMount() {

    //check if platform is android 
    if (Platform.OS == "android" && !Constants.isDevice ) {

      //set the state accordingly
      this.setState({
        errorMessage: "Dang! This cant work on an Android Emulator, try again on a real device!"
      });

    } else {

      //run the location function
      this._getLocationAsync();

      }


  }

    //get the current location asyncronously
    _getLocationAsync = async() => {

      let { status } = await Permissions.askAsync(Permissions.LOCATION);

      //if status has not been granted 

      if (status !== 'granted' ){

        //set the state 
        this.setState({
          errorMessage: 'Permission to access location was denied! Sorry'
        });

      } else {

        //however, if its granted, get the location
        let location = await Location.getCurrentPositionAsync({});

        //then set the state 
        this.setState({
          location
        });

      }


    };

  //then lets show the user 
  render() {

    //set the text as we wait 
    let text = "Waiting...";

    //check if there is an error and report 
    if (this.state.errorMessage) {

      text = this.state.errorMessage;

    } else if (this.state.location) {

      text = JSON.stringify(this.state.location);

    }

    //and we show the user 
    return (

      <View style={styles.container}>
        <Text style={styles.paragraph}>{text} </Text>
      </View>

    );

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1'
  }, 
    paragraph: {
      margin: 24, 
      fontSize: 18, 
      textAlign: 'center',
    },

});

