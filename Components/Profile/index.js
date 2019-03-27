import React, { Component } from "react";
import styles from "./styles";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { logout } from "../../store/actions/authActions";

class Profile extends Component {
  handleLogout = () => {
    this.props.logoutUser();
    this.props.navigation.replace("Login");
  };
  render() {
    let user = this.props.user;
    return (
      <View style={styles.container}>
        <View style={styles.header} />
        <Image style={styles.avatar} source={require("./pfp.png")} />
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text style={styles.name}>{user && user.username}</Text>
            <Text style={styles.info}>Full Stack Developer</Text>
            <Text style={styles.description}>
              Lorem ipsum dolor sit amet, saepe sapientem eu nam. Qui ne assum
              electram expetendis, omittam deseruisse consequuntur ius an,
            </Text>

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={this.handleLogout}
            >
              <Text>Log out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.authReducer.user
});

const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
