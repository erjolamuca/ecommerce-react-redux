import React from "react";
import { connect } from "react-redux";
//import StripeCheckout from "react-stripe-checkout";
import Table from "@material-ui/core/Table";
import { TableRow } from "@material-ui/core";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import { withStyles } from "@material-ui/core/styles";
import "typeface-mukta";
import { Elements, StripeProvider } from "react-stripe-elements";
import StripeCheckout from "./StripeCheckout";
import { removeAll } from "../actions/cart";

const styles = () => ({
  table: {
    width: "50%",
    marginBottom: 50,
    fontStyle: "italic"
  },
  title: {
    fontFamily: "Mukta",
    fontStyle: "italic",
    marginBottom: 50
  }
});

class CheckOutComponent extends React.Component {
  onToken = (token, address) => {};

  render() {
    const { classes } = this.props;
    return (
      <div>
        <p className={classes.title}>
          Click 'Pay with Card' Button to proceed with the payment
        </p>
        <Table className={classes.table}>
          <TableBody className={classes.tableBody}>
            {this.props.cart.items.map((item, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>
                    <img
                      component="img"
                      height="40"
                      width="40"
                      src={`/images/${item.image}`}
                      alt="Product"
                    />
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {item.name} <br />
                    {item.colour}/ {item.size} <br />
                    Quantity: {item.amount}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {item.price} $
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <StripeProvider apiKey="your_public_stripe_key">
          <div className="example">
            <h1>React Stripe Elements Example</h1>
            <Elements>
              <StripeCheckout
                amount={this.props.cart.totalPrice}
                emptyCart={this.props.removeAll}
              />
            </Elements>
          </div>
        </StripeProvider>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart
  };
};

export default connect(
  mapStateToProps,
  { removeAll }
)(withStyles(styles)(CheckOutComponent));
