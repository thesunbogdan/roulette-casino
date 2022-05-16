import React from "react";
import { noBets } from "./data";
import "./bettingMat.styles.scss";

class BettingMat extends React.Component {
  constructor() {
    super();

    this.state = {
      selectedChip: 10,
    };
  }
  showAlert = true;

  componentDidMount() {
    this.setState(noBets);
  }

  handleClick = (event) => {
    const { innerText } = event.target;

    if (this.state.selectedChip === 0) {
      alert("Please select a chip");
      return;
    }

    if (this.props.mustSpin) {
      alert("Please wait for the round to finish");
    }

    this.setState((prevState) => {
      return {
        [innerText]: prevState[innerText] + this.state.selectedChip,
      };
    });
  };

  calculatePrize = (winningNumber) => {
    var finalPrize = this.state[winningNumber] * 36;
    if (winningNumber === -1) {
      return;
    }
    if (winningNumber === 0) return this.state[winningNumber] * 36;
    if (winningNumber <= 12) finalPrize += this.state["1st 12"] * 3;
    else if (winningNumber > 12 && winningNumber <= 24)
      finalPrize += this.state["2nd 12"] * 3;
    else finalPrize += this.state["3rd 12"] * 3;
    if (winningNumber % 2 === 0) finalPrize += this.state["EVEN"] * 2;
    else finalPrize += this.state["ODD"] * 2;

    if (winningNumber % 3 === 0) finalPrize += this.state["1st 2 to 1"] * 3;
    else if (winningNumber % 3 === 1)
      finalPrize += this.state["3rd 2 to 1"] * 3;
    else finalPrize += this.state["2nd 2 to 1"] * 3;

    if (winningNumber <= 18) finalPrize += this.state["1 to 18"] * 2;
    else finalPrize += this.state["19 to 36"] * 2;
    if (
      [
        1, 3, 5, 7, 9, 12, 14, 26, 18, 21, 19, 23, 25, 27, 30, 32, 34, 36,
      ].indexOf(winningNumber)
    )
      finalPrize += this.state["red"] * 2;
    else finalPrize += this.state["black"] * 2;
    this.setState(noBets);
    return finalPrize;
  };

  render() {
    if (this.props.mustSpin === false && this.showAlert) {
      if (this.calculatePrize(this.props.winningNumber) != NaN)
        alert("You won: " + this.calculatePrize(this.props.winningNumber));
      this.showAlert = false;
    }
    if (this.props.mustSpin === true) {
      this.showAlert = true;
    }

    return (
      <>
        <table>
          <thead>
            <tr>
              <th
                data-value="0"
                rowSpan="3"
                className="green"
                onClick={this.handleClick}
              >
                0
              </th>
              <th className="red" onClick={this.handleClick}>
                3
              </th>
              <th onClick={this.handleClick} className="black">
                6
              </th>
              <th onClick={this.handleClick} className="red">
                9
              </th>
              <th onClick={this.handleClick} className="red">
                12
              </th>
              <th onClick={this.handleClick} className="black">
                15
              </th>
              <th onClick={this.handleClick} className="red">
                18
              </th>
              <th onClick={this.handleClick} className="red">
                21
              </th>
              <th onClick={this.handleClick} className="black">
                24
              </th>
              <th onClick={this.handleClick} className="red">
                27
              </th>
              <th onClick={this.handleClick} className="red">
                30
              </th>
              <th onClick={this.handleClick} className="black">
                33
              </th>
              <th onClick={this.handleClick} className="red">
                36
              </th>
              <th className="green" onClick={this.handleClick}>
                1st 2 to 1
              </th>
            </tr>
            <tr>
              <th onClick={this.handleClick} className="black">
                2
              </th>
              <th onClick={this.handleClick} className="red">
                5
              </th>
              <th onClick={this.handleClick} className="black">
                8
              </th>
              <th onClick={this.handleClick} className="black">
                11
              </th>
              <th onClick={this.handleClick} className="red">
                14
              </th>
              <th onClick={this.handleClick} className="black">
                17
              </th>
              <th onClick={this.handleClick} className="black">
                20
              </th>
              <th onClick={this.handleClick} className="red">
                23
              </th>
              <th onClick={this.handleClick} className="black">
                26
              </th>
              <th onClick={this.handleClick} className="black">
                29
              </th>
              <th onClick={this.handleClick} className="red">
                32
              </th>
              <th onClick={this.handleClick} className="black">
                35
              </th>
              <th className="green" onClick={this.handleClick}>
                2nd 2 to 1
              </th>
            </tr>
            <tr>
              <th onClick={this.handleClick} className="red">
                1
              </th>
              <th onClick={this.handleClick} className="black">
                4
              </th>
              <th onClick={this.handleClick} className="red">
                7
              </th>
              <th onClick={this.handleClick} className="black">
                10
              </th>
              <th onClick={this.handleClick} className="black">
                13
              </th>
              <th onClick={this.handleClick} className="red">
                16
              </th>
              <th onClick={this.handleClick} className="red">
                19
              </th>
              <th onClick={this.handleClick} className="black">
                22
              </th>
              <th onClick={this.handleClick} className="red">
                25
              </th>
              <th onClick={this.handleClick} className="black">
                28
              </th>
              <th onClick={this.handleClick} className="black">
                31
              </th>
              <th onClick={this.handleClick} className="red">
                34
              </th>
              <th className="green" onClick={this.handleClick}>
                3rd 2 to 1
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="none"></td>
              <td
                colSpan="4"
                rowSpan="2"
                className="green"
                onClick={this.handleClick}
              >
                1st 12
              </td>
              <td
                colSpan="4"
                rowSpan="2"
                className="green"
                onClick={this.handleClick}
              >
                2nd 12
              </td>
              <td
                colSpan="4"
                rowSpan="2"
                className="green"
                onClick={this.handleClick}
              >
                3rd 12
              </td>
              <td className="none"></td>
            </tr>
            <tr className="none">
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td className="none"></td>
              <td colSpan="2" className="green" onClick={this.handleClick}>
                1 to 18
              </td>
              <td colSpan="2" className="green" onClick={this.handleClick}>
                EVEN
              </td>
              <td colSpan="2" className="green" onClick={this.handleClick}>
                red
              </td>
              <td colSpan="2" className="green" onClick={this.handleClick}>
                black
              </td>
              <td colSpan="2" className="green" onClick={this.handleClick}>
                ODD
              </td>
              <td colSpan="2" className="green" onClick={this.handleClick}>
                19 to 36
              </td>
              <td className="none"></td>
            </tr>
          </tbody>
        </table>
        {Object.keys(this.state).map((key, value) => {
          if (this.state[key] != 0 && key != "selectedChip")
            return (
              <div key={key}>
                <p>
                  {key}: {this.state[key]}$
                </p>
              </div>
            );
        })}
      </>
    );
  }
}

export default BettingMat;
