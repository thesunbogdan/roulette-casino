class Login extends React.Component {
  theme = createTheme();

  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
    };
  }

  sendLoginData = async () => {
    const resp = await axios
      .post("http://localhost:3001/userInsert", {
        mail: this.state.email,
        password: this.state.password,
      })
      .catch((error) => console.log(error));

    console.log("User register status: " + resp.status);
    console.log("User register data: " + resp.data);
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
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
                Login
              </Typography>
              <Box
                component="form"
                onSubmit={this.handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  autoComplete="off"
                  onChange={this.handleChange}
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
                  onChange={this.handleChange}
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  href="/landing-page"
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
        <p>{JSON.stringify(this.state)}</p>
      </>
    );
  }
}

export default Login;
