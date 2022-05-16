import React from "react";
import { Wheel } from "react-custom-roulette";
import { data } from "./data";
import BettingMat from "./betting-mat";

class RoulettePage extends React.Component {
  constructor() {
    super();

    this.state = {
      mustSpin: null,
      data: [],
    };
  }

  winningNumber = -1;

  componentDidMount() {
    this.setState({ data: data });
  }

  getWinningNumber = () => {
    return Math.floor(Math.random() * 37);
  };

  render() {
    if (this.state.mustSpin === true) {
      this.winningNumber = this.getWinningNumber();
    }
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
          prizeNumber={this.winningNumber}
          data={this.state.data}
          backgroundColors={["#3e3e3e", "#df3428"]}
          textColors={["#ffffff"]}
        />
        {this.state.mustSpin ? (
          <button disabled>SPIN</button>
        ) : (
          <button onClick={() => this.setState({ mustSpin: true })}>
            SPIN
          </button>
        )}
        {/* <p>{this.state.data[this.winningNumber]?.option}</p> */}
        <BettingMat
          mustSpin={this.state.mustSpin}
          winningNumber={this.state.data[this.winningNumber]?.option}
        />
      </div>
    );
  }
}

export default RoulettePage;
