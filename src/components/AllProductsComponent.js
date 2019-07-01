import React from "react";
import { Link } from "react-router-dom";
import products from "../products.json";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import { withStyles } from "@material-ui/core/styles";
import "typeface-mukta";

const styles = () => ({
  name: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: "Mukta"
  },
  price: {
    textAlign: "center",
    fontSize: 20,
    fontFamily: "Mukta",
    fontStyle: "italic"
  }
});

class AllProductsComponent extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid container spacing={32} className="homepageContainer">
          {products.map(product => {
            return (
              <Grid item md={3} key={product.id}>
                <Card key={product.id}>
                  <Link
                    to={`/product/show/${product.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="300"
                        src={`/images/${product.image}`}
                      />

                      <CardContent>
                        <Typography className={classes.name}>
                          {product.name}
                        </Typography>
                        <Typography className={classes.price}>
                          {product.price} $
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Link>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(AllProductsComponent);
