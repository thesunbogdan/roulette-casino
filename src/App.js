import { Routes, Route, Link } from "react-router-dom";
import Register from "./Register";
import { data } from "./data";
import { Wheel } from "react-custom-roulette";
import "./roulette-page.styles.scss";
import "./bettingMat.styles.scss";
import { noBets } from "./data";
import * as React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: null,
    };
  }

  getWinningNumber = () => {
    return Math.floor(Math.random() * 37);
  };

  sendEveryTurn = async (id, newBalance) => {
    await axios.put(`http://localhost:3001/bank`, [id, newBalance]);
  };
  adminPage = () => {
    // const resp = await axios
    // .get("http://localhost:3001/auth")
    // .catch((error) => alert(error.message));
    // if(resp.status === 200)
    return (
      <table className="admin-table">
        <tbody>
          <tr>
            {[
              "id",
              "name",
              "surname",
              "nickname",
              "mail",
              "creation date",
              "age",
              "delete user",
            ].map((item) => (
              <td>
                <p style={{ color: "black" }}>{item}</p>
              </td>
            ))}
          </tr>
          <tr>
            {[
              "124jnfas2",
              "Bogdan Andrei",
              "Dosan",
              "Dosi",
              "dasd@asfas.com",
              "2022-18-29",
              "21",
            ].map((item) => (
              <td>
                <p style={{ color: "black" }}>{item}</p>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    );
  };
  Login = () => {
    let navigate = useNavigate();
    const theme = createTheme();

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const sendLoginData = async () => {
      const resp = await axios
        .post("http://localhost:3001/auth", {
          Mail: email,
          Password: password,
        })
        .catch((error) => alert(error.message));

      console.log("User login status: " + resp.status);
      console.log("User login data: " + JSON.stringify(resp.data));

      if (resp.status === 200) {
        this.setState({ currentUser: resp.data });
        navigate("/roulette-page");
      }
    };

    return (
      <>
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Login
              </Typography>
              <Box component="form" sx={{ mt: 1 }}>
                <TextField
                  autoComplete="off"
                  onChange={(event) => setEmail(event.target.value)}
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoFocus
                />
                <TextField
                  autoComplete="off"
                  onChange={(event) => setPassword(event.target.value)}
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                />

                <Button
                  onClick={sendLoginData}
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Login
                </Button>
                <Grid container>
                  <Grid item>
                    <Link to="/register">
                      {"Don't have an account? Register"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      </>
    );
  };

  roulettePage = () => {
    const [inputValue, setInputValue] = useState();
    const [balance, setBalance] = useState(this.state.currentUser.Balance);
    const [history, setHistory] = useState([]);
    const [mustSpin, setMustSpin] = useState(null);
    const [selectedChip, setSelectedChip] = useState(50);
    const [winningNumber, setWinningNumber] = useState(0);
    const [state, setState] = useState(noBets);

    const calculatePrize = (winningNumber) => {
      var finalPrize = state[winningNumber] * 36;
      if (winningNumber === 0) return state[winningNumber] * 36;
      if (winningNumber <= 12) finalPrize += state["1st 12"] * 3;
      else if (winningNumber > 12 && winningNumber <= 24)
        finalPrize += state["2nd 12"] * 3;
      else finalPrize += state["3rd 12"] * 3;
      if (winningNumber % 2 === 0) finalPrize += state["EVEN"] * 2;
      else finalPrize += state["ODD"] * 2;

      if (winningNumber % 3 === 0) finalPrize += state["1st 2 to 1"] * 3;
      else if (winningNumber % 3 === 1) finalPrize += state["3rd 2 to 1"] * 3;
      else finalPrize += state["2nd 2 to 1"] * 3;

      if (winningNumber <= 18) finalPrize += state["1 to 18"] * 2;
      else finalPrize += state["19 to 36"] * 2;

      if (winningNumber != 0) {
        if (
          [
            1, 3, 5, 7, 9, 12, 14, 16, 18, 21, 19, 23, 25, 27, 30, 32, 34, 36,
          ].includes(winningNumber)
        ) {
          finalPrize += state["red"] * 2;
        } else {
          finalPrize += state["black"] * 2;
        }
      }

      return finalPrize;
    };

    const handleClick = (event) => {
      const { innerText } = event.target;
      if (balance >= 0) {
        if (balance === 0) {
          alert("You're out of money");
          return;
        } else if (balance - selectedChip < 0) {
          alert("Choose a smaller chip");
          return;
        } else {
          setBalance((oldBalance) => oldBalance - selectedChip);
        }
        setState((prevState) => {
          return {
            ...prevState,
            [innerText]: prevState[innerText] + selectedChip,
          };
        });
      }
    };

    return (
      <div className="body">
        <div className="left">
          <div className="top">
            <Wheel
              onStopSpinning={() => {
                const win = calculatePrize(data[winningNumber].option);
                alert("You won: " + win + "$");
                setHistory([...history, data[winningNumber].option]);
                setBalance((oldBalance) => {
                  this.sendEveryTurn(
                    this.state.currentUser.UserId,
                    oldBalance + win
                  );
                  return oldBalance + win;
                });

                setMustSpin(false);
                setState(noBets);
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
              mustStartSpinning={mustSpin}
              prizeNumber={winningNumber}
              data={data}
              backgroundColors={["#3e3e3e", "#df3428"]}
              textColors={["#ffffff"]}
            />
            {mustSpin ? (
              <button disabled className="spin-button">
                SPIN
              </button>
            ) : (
              <button
                className="spin-button"
                onClick={() => {
                  const prizeNumber = Math.floor(Math.random() * 37);
                  setWinningNumber(prizeNumber);
                  setMustSpin(true);
                }}
              >
                SPIN
              </button>
            )}
          </div>
          <div className="bottom">
            <div className="segment" style={{ flex: 0.1 }}>
              {" "}
              <p>
                Hello,{" "}
                {this.state.currentUser
                  ? this.state.currentUser.NickName
                  : "Guest"}
                !
              </p>
              <p>Your balance: {balance}$</p>
            </div>
            <div className="segment" style={{ flex: 0.1 }}>
              <Button
                variant="contained"
                onClick={() => this.setState({ currentUser: null })}
              >
                Disconnect
              </Button>
            </div>
            <div className="segment" style={{ margin: "100px 0", flex: 0.8 }}>
              {[10, 50, 100, 250].map((item) => (
                <button
                  onClick={() => setSelectedChip(item)}
                  className={`${selectedChip == item ? "selected" : "chip"}`}
                >
                  {item}$
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="right">
          <div className="mat-and-bets">
            <div className="mat">
              <table>
                <thead>
                  <tr>
                    <th
                      data-value="0"
                      rowSpan="3"
                      className="green"
                      onClick={!mustSpin ? handleClick : null}
                    >
                      0
                    </th>
                    <th
                      className="red"
                      onClick={!mustSpin ? handleClick : null}
                    >
                      3
                    </th>
                    <th
                      onClick={!mustSpin ? handleClick : null}
                      className="black"
                    >
                      6
                    </th>
                    <th
                      onClick={!mustSpin ? handleClick : null}
                      className="red"
                    >
                      9
                    </th>
                    <th
                      onClick={!mustSpin ? handleClick : null}
                      className="red"
                    >
                      12
                    </th>
                    <th
                      onClick={!mustSpin ? handleClick : null}
                      className="black"
                    >
                      15
                    </th>
                    <th
                      onClick={!mustSpin ? handleClick : null}
                      className="red"
                    >
                      18
                    </th>
                    <th
                      onClick={!mustSpin ? handleClick : null}
                      className="red"
                    >
                      21
                    </th>
                    <th
                      onClick={!mustSpin ? handleClick : null}
                      className="black"
                    >
                      24
                    </th>
                    <th
                      onClick={!mustSpin ? handleClick : null}
                      className="red"
                    >
                      27
                    </th>
                    <th
                      onClick={!mustSpin ? handleClick : null}
                      className="red"
                    >
                      30
                    </th>
                    <th
                      onClick={!mustSpin ? handleClick : null}
                      className="black"
                    >
                      33
                    </th>
                    <th
                      onClick={!mustSpin ? handleClick : null}
                      className="red"
                    >
                      36
                    </th>
                    <th
                      className="green"
                      onClick={!mustSpin ? handleClick : null}
                    >
                      1st 2 to 1
                    </th>
                  </tr>
                  <tr>
                    <th
                      onClick={!mustSpin ? handleClick : null}
                      className="black"
                    >
                      2
                    </th>
                    <th
                      onClick={!mustSpin ? handleClick : null}
                      className="red"
                    >
                      5
                    </th>
                    <th
                      onClick={!mustSpin ? handleClick : null}
                      className="black"
                    >
                      8
                    </th>
                    <th
                      onClick={!mustSpin ? handleClick : null}
                      className="black"
                    >
                      11
                    </th>
                    <th
                      onClick={!mustSpin ? handleClick : null}
                      className="red"
                    >
                      14
                    </th>
                    <th
                      onClick={!mustSpin ? handleClick : null}
                      className="black"
                    >
                      17
                    </th>
                    <th
                      onClick={!mustSpin ? handleClick : null}
                      className="black"
                    >
                      20
                    </th>
                    <th
                      onClick={!mustSpin ? handleClick : null}
                      className="red"
                    >
                      23
                    </th>
                    <th
                      onClick={!mustSpin ? handleClick : null}
                      className="black"
                    >
                      26
                    </th>
                    <th
                      onClick={!mustSpin ? handleClick : null}
                      className="black"
                    >
                      29
                    </th>
                    <th
                      onClick={!mustSpin ? handleClick : null}
                      className="red"
                    >
                      32
                    </th>
                    <th
                      onClick={!mustSpin ? handleClick : null}
                      className="black"
                    >
                      35
                    </th>
                    <th
                      className="green"
                      onClick={!mustSpin ? handleClick : null}
                    >
                      2nd 2 to 1
                    </th>
                  </tr>
                  <tr>
                    <th
                      onClick={!mustSpin ? handleClick : null}
                      className="red"
                    >
                      1
                    </th>
                    <th
                      onClick={!mustSpin ? handleClick : null}
                      className="black"
                    >
                      4
                    </th>
                    <th
                      onClick={!mustSpin ? handleClick : null}
                      className="red"
                    >
                      7
                    </th>
                    <th
                      onClick={!mustSpin ? handleClick : null}
                      className="black"
                    >
                      10
                    </th>
                    <th
                      onClick={!mustSpin ? handleClick : null}
                      className="black"
                    >
                      13
                    </th>
                    <th
                      onClick={!mustSpin ? handleClick : null}
                      className="red"
                    >
                      16
                    </th>
                    <th
                      onClick={!mustSpin ? handleClick : null}
                      className="red"
                    >
                      19
                    </th>
                    <th
                      onClick={!mustSpin ? handleClick : null}
                      className="black"
                    >
                      22
                    </th>
                    <th
                      onClick={!mustSpin ? handleClick : null}
                      className="red"
                    >
                      25
                    </th>
                    <th
                      onClick={!mustSpin ? handleClick : null}
                      className="black"
                    >
                      28
                    </th>
                    <th
                      onClick={!mustSpin ? handleClick : null}
                      className="black"
                    >
                      31
                    </th>
                    <th
                      onClick={!mustSpin ? handleClick : null}
                      className="red"
                    >
                      34
                    </th>
                    <th
                      className="green"
                      onClick={!mustSpin ? handleClick : null}
                    >
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
                      onClick={!mustSpin ? handleClick : null}
                    >
                      1st 12
                    </td>
                    <td
                      colSpan="4"
                      rowSpan="2"
                      className="green"
                      onClick={!mustSpin ? handleClick : null}
                    >
                      2nd 12
                    </td>
                    <td
                      colSpan="4"
                      rowSpan="2"
                      className="green"
                      onClick={!mustSpin ? handleClick : null}
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
                    <td
                      colSpan="2"
                      className="green"
                      onClick={!mustSpin ? handleClick : null}
                    >
                      1 to 18
                    </td>
                    <td
                      colSpan="2"
                      className="green"
                      onClick={!mustSpin ? handleClick : null}
                    >
                      EVEN
                    </td>
                    <td
                      colSpan="2"
                      className="green"
                      onClick={!mustSpin ? handleClick : null}
                    >
                      red
                    </td>
                    <td
                      colSpan="2"
                      className="green"
                      onClick={!mustSpin ? handleClick : null}
                    >
                      black
                    </td>
                    <td
                      colSpan="2"
                      className="green"
                      onClick={!mustSpin ? handleClick : null}
                    >
                      ODD
                    </td>
                    <td
                      colSpan="2"
                      className="green"
                      onClick={!mustSpin ? handleClick : null}
                    >
                      19 to 36
                    </td>
                    <td className="none"></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="bets-and-history">
              <div className="history">
                History:
                {history.map((number) => (
                  <p>{number}</p>
                ))}
              </div>
              <div className="bets">
                {Object.keys(state).map((key, value) => {
                  if (state[key] != 0)
                    return (
                      <div className="bet" key={key}>
                        {key}: {state[key]}$
                      </div>
                    );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    console.log(this.state.currentUser);
    return (
      <Routes>
        <Route path="/*" element={<this.Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/roulette-page"
          element={
            this.state.currentUser ? <this.roulettePage /> : <Navigate to="/" />
          }
        />
        <Route path="/admin" element={<this.adminPage />} />
      </Routes>
    );
  }
}

export default App;
