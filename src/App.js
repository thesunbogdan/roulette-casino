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
import { makeStyles } from "@mui/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Input from "@mui/material/Input";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import { useEffect } from "react";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: null,
    };
  }

  landingPage = () => {
    let navigate = useNavigate();
    return (
      <div className="landing-page-body">
        <div className="top">
          <div style={{ paddingTop: "70px" }}>
            <p>Welcome,</p>
            <p>{this.state.currentUser.NickName}</p>
            {console.log(this.state.currentUser)}
          </div>
        </div>
        <div className="bottom">
          <div className="half">
            <p>Current balance: {this.state.currentUser.Balance}</p>
          </div>
          <div className="half">
            <button onClick={() => navigate("/roulette-page")}>Play</button>
          </div>
        </div>
      </div>
    );
  };
  useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
      marginTop: "10px",
      overflowX: "auto",
    },
    table: {
      minWidth: 650,
    },
    selectTableCell: {
      width: 60,
    },
    tableCell: {
      width: 130,
      height: 40,
    },
    input: {
      width: 130,
      height: 40,
    },
  }));

  CustomTableCell = ({ row, name, onChange }) => {
    const classes = this.useStyles();
    const { isEditMode } = row;
    return (
      <TableCell align="left" className={classes.tableCell}>
        {isEditMode ? (
          <Input
            value={row[name]}
            name={name}
            onChange={(e) => onChange(e, row)}
            className={classes.input}
          />
        ) : (
          row[name]
        )}
      </TableCell>
    );
  };
  adminPage = () => {
    const [rows, setRows] = useState();
    useEffect(() => {
      axios.get("http://localhost:3001/user").then((resp) =>
        setRows(
          resp.data.map((item) => {
            console.log(item);
            item["isEditMode"] = false;
            item["creationdate"] = item["creationdate"].toString();
            return item;
          })
        )
      );
    }, []);

    console.log(rows);
    const [previous, setPrevious] = React.useState({});
    const classes = this.useStyles();

    const onToggleEditMode = async (id) => {
      setRows((state) => {
        return rows.map((row) => {
          if (row.id === id) {
            return { ...row, isEditMode: !row.isEditMode };
          }
          return row;
        });
      });
    };

    const updateUserInfo = async (id) => {
      var index = -1;
      setRows((state) => {
        return rows.map((row, idx) => {
          if (row.id === id) {
            index = idx;
            return { ...row, isEditMode: !row.isEditMode };
          }
          return row;
        });
      });
      // console.log(rows[index]);
      const rowsProcessed = rows[index];
      delete rowsProcessed["id"];
      delete rowsProcessed["isEditMode"];
      delete rowsProcessed["creationdate"];
      // console.log(rowsProcessed);

      const resp = await axios.put(
        `http://localhost:3001/user/${id}`,
        rowsProcessed
      );
      console.log(resp.status);

      //
    };

    const onChange = (e, row) => {
      if (!previous[row.id]) {
        setPrevious((state) => ({ ...state, [row.id]: row }));
      }
      const value = e.target.value;
      const name = e.target.name;
      const { id } = row;
      const newRows = rows?.map((row) => {
        if (row.id === id) {
          return { ...row, [name]: value };
        }
        return row;
      });
      setRows(newRows);
    };

    const onRevert = (id) => {
      const newRows = rows?.map((row) => {
        if (row.id === id) {
          return previous[id] ? previous[id] : row;
        }
        return row;
      });
      setRows(newRows);
      setPrevious((state) => {
        delete state[id];
        return state;
      });
      onToggleEditMode(id);
    };

    return (
      <Paper className={classes.root}>
        <Table className={classes.table} aria-label="caption table">
          <caption>A barbone structure table example with a caption</caption>
          <TableHead>
            <TableRow>
              <TableCell align="left" />
              <TableCell align="left">age</TableCell>
              <TableCell align="left">balance</TableCell>
              <TableCell align="left">creationDate</TableCell>
              <TableCell align="left">id</TableCell>
              <TableCell align="left">losses</TableCell>
              <TableCell align="left">mail</TableCell>
              <TableCell align="left">moneywon</TableCell>
              <TableCell align="left">nickname</TableCell>
              <TableCell align="left">password</TableCell>
              <TableCell align="left">surname</TableCell>
              <TableCell align="left">wins</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row) => (
              <TableRow key={row.id}>
                <TableCell className={classes.selectTableCell}>
                  {row.isEditMode ? (
                    <>
                      <IconButton
                        aria-label="done"
                        onClick={() => updateUserInfo(row.id)}
                      >
                        <DoneAllIcon />
                      </IconButton>
                      <IconButton
                        aria-label="revert"
                        onClick={() => onRevert(row.id)}
                      >
                        <NotInterestedIcon />
                      </IconButton>
                    </>
                  ) : (
                    <IconButton
                      aria-label="delete"
                      onClick={() => onToggleEditMode(row.id)}
                    >
                      <EditIcon />
                    </IconButton>
                  )}
                </TableCell>

                <this.CustomTableCell {...{ row, name: "age", onChange }} />

                <this.CustomTableCell {...{ row, name: "balance", onChange }} />
                <this.CustomTableCell
                  {...{ row, name: "creationdate", onChange }}
                />
                <this.CustomTableCell {...{ row, name: "id", onChange }} />
                <this.CustomTableCell {...{ row, name: "losses", onChange }} />
                <this.CustomTableCell {...{ row, name: "mail", onChange }} />
                <this.CustomTableCell
                  {...{ row, name: "moneywon", onChange }}
                />
                <this.CustomTableCell
                  {...{ row, name: "nickname", onChange }}
                />
                <this.CustomTableCell
                  {...{ row, name: "password", onChange }}
                />
                <this.CustomTableCell {...{ row, name: "surname", onChange }} />
                <this.CustomTableCell {...{ row, name: "wins", onChange }} />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  };

  getWinningNumber = () => {
    return Math.floor(Math.random() * 37);
  };

  sendEveryTurn = async (id, newBalance) => {
    const resp = await axios.put(
      `http://localhost:3001/bank/${id}/${newBalance}`
    );
    console.log("resp >>> " + resp.status);
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
        if (resp.data.UserId === 2) {
          navigate("/admin");
        } else {
          navigate("/landing-page");
        }
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
        <Route
          path="/admin"
          element={
            this.state.currentUser &&
            this.state.currentUser.UserId.toString() === "2" ? (
              <this.adminPage />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/landing-page"
          element={
            this.state.currentUser ? <this.landingPage /> : <Navigate to="/" />
          }
        />
      </Routes>
    );
  }
}

export default App;
