import React, { Component } from "react";

// NativeBase Components
import {
  Text,
  Button,
  Body,
  List,
  ListItem,
  Form,
  Label,
  Input,
  Item,
  Content,
  Header
} from "native-base";
import {
  login,
  signup,
  checkForExpiredToken
} from "../../store/actions/authActions";
import { connect } from "react-redux";

class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  componentDidMount = async () => {
    await this.props.checkToken();
    // console.log(
    //   "ZERO => componentDidMount => user: ",
    //   this.props.user.username
    // );
    console.log("LOGIN => componentDidMount");
    let user = this.props.user;
    if (user) this.props.navigation.replace("Profile");
  };

  handleRegister = () => {
    console.log("ZERO => state => value:", this.state);
    this.props.register(this.state, this.props.navigation);
  };
  render() {
    return (
      <Content>
        <Header transparent />
        <List>
          <ListItem style={{ borderBottomWidth: 0 }}>
            <Body>
              <Form>
                <Body>
                  <Label style={{ color: "white" }}>Username</Label>
                </Body>
                <Item
                  rounded
                  style={{
                    backgroundColor: "white",
                    marginTop: 10,
                    marginBottom: 10
                  }}
                >
                  <Input
                    autoCorrect={false}
                    autoCapitalize="none"
                    onChangeText={username => this.setState({ username })}
                    value={this.state.username}
                  />
                </Item>
                <Body>
                  <Label style={{ color: "white" }}>Password</Label>
                </Body>
                <Item
                  rounded
                  style={{ backgroundColor: "white", marginTop: 10 }}
                >
                  <Input
                    autoCorrect={false}
                    secureTextEntry
                    autoCapitalize="none"
                    onChangeText={password => this.setState({ password })}
                    value={this.state.password}
                  />
                </Item>
              </Form>
            </Body>
          </ListItem>
          <Button
            full
            success
            onPress={() =>
              this.props.loginUser(this.state, this.props.navigation)
            }
          >
            <Text>Login</Text>
          </Button>
          <Button full warning onPress={this.handleRegister}>
            <Text>Register</Text>
          </Button>
        </List>
        <Body>
          <Label style={{ color: "red", opacity: 0.6 }} />
        </Body>
      </Content>
    );
  }
}

const mapStateToProps = state => ({
  user: state.authReducer.user
});

const mapDispatchToProps = dispatch => ({
  loginUser: (user, navigation) => dispatch(login(user, navigation)),
  register: (user, navigation) => dispatch(signup(user, navigation)),
  checkToken: () => dispatch(checkForExpiredToken())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
