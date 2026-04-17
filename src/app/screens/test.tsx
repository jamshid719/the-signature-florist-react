// @ts-nocheck
import React, { Component } from "react";

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brand: "Ford",
      model: "Mustang",
      color: "red",
      year: 1964,
    };
  }
  changeDetail = () => {
    this.setState({
      color: "blue",
      brand: "Tesla",
      model: "Model S",
      year: 2010,
    });
  };

  componentDidMount() {
    console.log("componentDidMount");
    //runs after first render => Backenddan datani olish un ishlatiladi(RETRIEVE DATA FROM BACKEND SERVER)
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
    //runs before component unmount(desappare)
  }

  componentDidUpdate() {}

  render() {
    return (
      <div>
        <h1>My {this.state.brand}</h1>
        <p>
          color: - {this.state.color}
          model: - {this.state.model}
          {this.state.year}.
        </p>
        <button type="button" onClick={this.changeDetail}>
          Change Detail
        </button>
      </div>
    );
  }
}

export default Test;
