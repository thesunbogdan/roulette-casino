import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      yearsOld: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      nickname: "",
    };
  }

  sendRegisterData = async () => {
    if (this.state.password !== this.state.confirmPassword) {
      alert("Passwords don't match");
      return;
    } else {
      const resp = await axios
        .post("http://localhost:3001/userInsert", {
          Nickname: this.state.nickname,
          Surname: this.state.lastName,
          Name: this.state.firstName,
          Mail: this.state.email,
          Age: this.state.yearsOld,
          Password: this.state.password,
        })
        .catch((error) => console.log(error));

      console.log("User register status: " + resp.status);
      console.log("User register data: " + resp.data);
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  theme = createTheme();
  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.password !== this.state.confirmPassword) {
      alert("Passwords do not match");
    }
  };

  render() {
    return (
      <>
        <ThemeProvider theme={this.theme}>
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
                Register
              </Typography>
              <Box component="form" sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="off"
                      onChange={this.handleChange}
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="off"
                      onChange={this.handleChange}
                      required
                      fullWidth
                      label="Last Name"
                      name="lastName"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="off"
                      onChange={this.handleChange}
                      required
                      fullWidth
                      id="nickname"
                      label="Nickname"
                      name="nickname"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="off"
                      onChange={this.handleChange}
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="off"
                      onChange={this.handleChange}
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="off"
                      onChange={this.handleChange}
                      required
                      fullWidth
                      name="confirmPassword"
                      label="Confirm Password"
                      type="password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="off"
                      onChange={this.handleChange}
                      required
                      fullWidth
                      name="yearsOld"
                      label="Years old"
                    />
                  </Grid>
                </Grid>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={this.sendRegisterData}
                >
                  Register
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link to="/" variant="body2">
                      Already have an account? Login
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
        <p>{JSON.stringify(this.state)}</p>
      </>
    );
  }
}
export default Register;
