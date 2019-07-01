import React, { Component } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import axios from "axios";

class CheckoutForm extends Component {
  state = { complete: false };

  submit = async ev => {
    let { token } = await this.props.stripe.createToken({ name: "Name" });
    if (!token) {
      return;
    }
    let response = await axios.post("/charge", {
      stripeToken: token.id,
      amount: this.props.amount
    });

    if (response.data.status === "succeeded") {
      this.setState({ complete: true });
      this.props.emptyCart();
    }
  };

  render() {
    if (this.state.complete) return <h1>Purchase Complete</h1>;

    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <button onClick={this.submit}>Send</button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);
