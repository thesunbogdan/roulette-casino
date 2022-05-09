import React from "react";
import RoulettePage from "./roulette-page";
import { Routes, Route } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: null,
    };
  }

  render() {
    return (
      <Routes>
        <Route path="/*" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/roulette-page" element={<RoulettePage />} />
      </Routes>
    );
  }
}

export default App;
