import React from "react";
import { connect } from "react-redux";
import { save } from "../actions/cart";
import products from "../products.json";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import "typeface-mukta";
import Zoom from "react-img-zoom";

const styles = () => ({
  name: {
    fontSize: 28,
    fontFamily: "Mukta"
  },
  price: {
    fontSize: 24,
    fontFamily: "Mukta",
    fontStyle: "italic"
  },
  select: {
    width: 120,
    padding: "5px 35px 5px 5px",
    fontSize: 16,
    border: "1px solid #ccc",
    height: 34,
    marginTop: 15,
    marginRight: 10
  },
  showButton: {
    marginTop: 30,
    border: "1px solid #000",
    color: "black"
  },
  text: {
    marginTop: 10,
    fontSize: 12,
    fontStyle: "italic"
  }
});

class SingleProductComponent extends React.Component {
  state = {
    product: null,
    colour: null,
    size: null,
    text: "",
    shown: true
  };

  componentDidMount() {
    const product = products[this.props.match.params.id - 1];
    this.setState({
      product,
      colour: product.colour[0],
      size: product.size[0]
    });
  }

  handleChangeColour = event => {
    this.setState({ colour: event.target.value });
  };

  handleChangeSize = event => {
    this.setState({ size: event.target.value });
  };

  buttonClick = e => {
    const { product, colour, size } = this.state;
    this.props.save(product, colour, size);
    this.setState({
      shown: !this.state.shown
    });
    this.setState({ text: "Item added to cart!!" });
  };

  render() {
    const { classes } = this.props;

    var shown = {
      display: this.state.shown ? "block" : "none"
    };

    var hidden = {
      display: this.state.shown ? "none" : "block",
      textDecoration: "none"
    };

    const product = this.state.product;
    if (!product) return <h3>Loading...</h3>;

    return (
      <div>
        <Grid container spacing={32} className="homepageContainer">
          <Grid item md={4}>
            <Zoom
              img={`/images/${product.image}`}
              zoomScale={3}
              height={350}
              width={350}
            />
          </Grid>
          <Grid item md={3} key={product.id}>
            <Typography className={classes.name}>{product.name}</Typography>
            <Typography className={classes.price}>{product.price} $</Typography>

            <select
              value={this.state.colour}
              onChange={this.handleChangeColour}
              className={classes.select}
            >
              {product.colour.map(colour => {
                return (
                  <option key={colour} value={colour}>
                    {colour}
                  </option>
                );
              })}
            </select>
            <select
              value={this.state.size}
              onChange={this.handleChangeSize}
              className={classes.select}
            >
              {product.size.map(size => {
                return (
                  <option key={size} value={size}>
                    {size}
                  </option>
                );
              })}
            </select>
            <Button
              className={classes.showButton}
              style={shown}
              onClick={this.buttonClick}
            >
              Add to cart
            </Button>
            <Link to="/cart" style={hidden} color="inherit">
              <Button type="button" className={classes.showButton}>
                View cart
              </Button>
            </Link>
            <p className={classes.text}>{this.state.text}</p>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default connect(
  null,
  { save }
)(withStyles(styles)(SingleProductComponent));
