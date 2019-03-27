import React, { Component } from "react";
import { Spinner } from "native-base";
import HomePage from "./Components/HomePage";
import { Provider } from "react-redux";

import { AsyncStorage } from "react-native";

// Store
import store from "./store";

class App extends Component {
  state = {
    loading: true
  };

  async componentDidMount() {
    let test = await AsyncStorage.getItem("token");
    console.log("App => componentDidMount => AsyncStorage: ", test);
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) {
      return <Spinner color="white" />;
    }
    return (
      <Provider store={store}>
        <HomePage />
      </Provider>
    );
  }
}

export default App;
