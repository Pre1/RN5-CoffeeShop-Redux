import React, { Component } from "react";
import { Icon, Button, Text } from "native-base";
import { withNavigation } from "react-navigation";

import { connect } from "react-redux";
import { quantityCounter } from "../../Utilities/Counter";

class CartButton extends Component {
  render() {
    let route = this.props.user ? "CoffeeCart" : "Login";
    return (
      <Button transparent>
        <Text style={{ color: "white", fontSize: 25 }}>
          {this.props.quantity && this.props.quantity}
          <Icon
            onPress={() => this.props.navigation.navigate(route)}
            name="shoppingcart"
            type="AntDesign"
          />
        </Text>
      </Button>
    );
  }
}

const mapStateToProps = state => ({
  quantity: quantityCounter(state.cartReducer.items),
  user: state.authReducer.user
});

export default withNavigation(connect(mapStateToProps)(CartButton));
