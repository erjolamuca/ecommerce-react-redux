import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import MenuComponent from "./components/MenuComponent";
import ProductsComponent from "./components/ProductsComponent";

class App extends Component {
  render() {
    return (
      <div className="App">
        <MenuComponent />
        <ProductsComponent />
      </div>
    );
  }
}

export default App;
