import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import categories from "../categories.json";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import { withStyles } from "@material-ui/core/styles";
import "typeface-marck-script";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  drawerPaper: {
    width: drawerWidth,
    borderRight: "none"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    backgroundColor: "white",
    paddingTop: 80
  },
  menu: {
    fontFamily: "Marck-Script",
    color: "black",
    paddingTop: 10,
    fontStyle: "italic",
    marginLeft: 20
  },
  divider: {
    width: "80%",
    marginLeft: 15
  },
  pageTitle: {
    fontFamily: "Marck-Script",
    color: "black",
    fontStyle: "italic",
    marginLeft: 15,
    fontSize: 25
  }
});

class MenuComponent extends React.Component {
  render() {
    const { classes, theme } = this.props;

    const drawer = (
      <div>
        <List>
          <p className={classes.pageTitle}>E-Commerce</p>
          <Link to="/" style={{ textDecoration: "none" }} color="inherit">
            <Button type="button" className={classes.menu}>
              Home
            </Button>
          </Link>
          <Divider className={classes.divider} />
          {categories.map(category => {
            return (
              <div key={category.id}>
                <Link
                  to={`/${category.id}`}
                  style={{ textDecoration: "none" }}
                  color="inherit"
                >
                  <Button type="button" className={classes.menu}>
                    {category.name}
                  </Button>
                </Link>
                <Divider className={classes.divider} />
              </div>
            );
          })}
          <Link to="/cart" style={{ textDecoration: "none" }} color="inherit">
            <Button type="button" className={classes.menu}>
              <FontAwesomeIcon icon={faShoppingCart} />
              Cart (
              {this.props.cart.items.reduce(
                (totalProducts, item) => totalProducts + item.amount,
                0
              )}
              )
            </Button>
          </Link>
          <Divider className={classes.divider} />
        </List>
      </div>
    );
    return (
      <div className={classes.root}>
        <CssBaseline />
        <nav className={classes.drawer}>
          <Hidden smUp implementation="css">
            <Drawer
              container={this.props.container}
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              classes={{
                paper: classes.drawerPaper
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>{this.props.children}</main>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart
  };
};

export default connect(mapStateToProps)(
  withStyles(styles, { withTheme: true })(MenuComponent)
);
