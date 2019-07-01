import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import MenuComponent from "../components/MenuComponent";
import ProductsComponent from "../components/ProductsComponent";
import CartComponent from "../components/CartComponent";
import AllProductsComponent from "../components/AllProductsComponent";
import SingleProductComponent from "../components/SingleProductComponent";
import CheckOutComponent from "../components/CheckOutComponent";

const AppRouter = () => (
  <BrowserRouter>
    <MenuComponent>
      <Switch>
        <Route path="/" component={AllProductsComponent} exact={true} />
        <Route path="/cart" component={CartComponent} exact={true} />
        <Route path="/checkout" component={CheckOutComponent} exact={true} />
        <Route
          path="/product/show/:id"
          component={SingleProductComponent}
          exact={true}
        />
        <Route path="/:id" component={ProductsComponent} exact={true} />
      </Switch>
    </MenuComponent>
  </BrowserRouter>
);

export default AppRouter;
