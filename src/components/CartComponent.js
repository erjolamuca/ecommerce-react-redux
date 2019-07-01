import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { remove } from "../actions/cart";
import Table from "@material-ui/core/Table";
import { TableHead, TableRow, Button } from "@material-ui/core";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import { withStyles } from "@material-ui/core/styles";
import "typeface-mukta";

const styles = () => ({
  tableHead: {
    fontStyle: "italic",
    fontSize: 12
  },
  tableCell: {
    fontSize: 14
  },

  price: {
    fontFamily: "Mutka",
    fontStyle: "bold",
    fontSize: 16,
    textAlign: "right",
    marginRight: 30
  },
  checkout: {
    border: "1px solid #000",
    color: "black",
    float: "right",
    marginRight: 20
  },
  removeButton: {
    color: "#3B170B",
    fontStyle: "italic",
    border: "1px solid #3B170B",
    padding: 2,
    fontSize: 10,
    marginTop: 10
  }
});

class CartComponent extends React.Component {
  onRemove = item => {
    console.log(item);
    this.props.remove(item);
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Table className={classes.table}>
          <TableHead className={classes.tableHead}>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Info</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className={classes.tableBody}>
            {this.props.cart.items.map((item, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>
                    <img
                      component="img"
                      height="150"
                      width="200"
                      src={`/images/${item.image}`}
                      alt="Product"
                    />
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {item.name} <br />
                    {item.colour}/ {item.size}
                    <br />
                    <Button
                      className={classes.removeButton}
                      onClick={() => this.onRemove(item)}
                    >
                      Remove
                    </Button>
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {item.price} $
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {item.amount}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <p className={classes.price}>
          Total Price: {this.props.cart.totalPrice} $
        </p>
        <Link to="/checkout" style={{ textDecoration: "none" }} color="inherit">
          <Button className={classes.checkout}>Check out</Button>
        </Link>
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
  { remove }
)(withStyles(styles)(CartComponent));
