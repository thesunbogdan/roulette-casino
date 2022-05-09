import React from "react";
import { Wheel } from "react-custom-roulette";
import data from "./data";

class RoulettePage extends React.Component {
  constructor() {
    super();

    this.state = {
      mustSpin: false,
      data: [],
    };
  }

  componentDidMount() {
    this.setState({ data: data });
  }

  getWinningNumber = () => {
    return Math.floor(Math.random() * 37);
  };

  render() {
    return (
      <div>
        <Wheel
          onStopSpinning={() => {
            this.setState({ mustSpin: false });
          }}
          outerBorderColor="#4a2b22"
          outerBorderWidth={20}
          radiusLineColor="#D4AF37"
          radiusLineWidth={4}
          innerRadius={30}
          innerBorderColor="#4a2b22"
          fontSize={15}
          perpendicularText={true}
          innerBorderWidth={40}
          textDistance="80"
          mustStartSpinning={this.state.mustSpin}
          prizeNumber={this.getWinningNumber()}
          data={this.state.data}
          backgroundColors={["#3e3e3e", "#df3428"]}
          textColors={["#ffffff"]}
        />
        <button onClick={() => this.setState({ mustSpin: true })}>SPIN</button>
        {/* <p>{this.state.mustSpin ? "true" : "false"}</p> */}
        {/* <p>{this.state.data[this.state.winningNumber]?.option}</p> */}
      </div>
    );
  }
}

export default RoulettePage;
