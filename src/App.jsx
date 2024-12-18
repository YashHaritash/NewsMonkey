import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route
              key="home"
              path="/"
              element={<News pageSize={5} country="us" category="general" />}
            />
            <Route
              key="general"
              path="/general"
              element={<News pageSize={5} country="us" category="general" />}
            />
            <Route
              key="business"
              path="/business"
              element={<News pageSize={5} country="us" category="business" />}
            />
            <Route
              key="entertainment"
              path="/entertainment"
              element={
                <News pageSize={5} country="us" category="entertainment" />
              }
            />
            <Route
              key="health"
              path="/health"
              element={<News pageSize={5} country="us" category="health" />}
            />
            <Route
              key="science"
              path="/science"
              element={<News pageSize={5} country="us" category="science" />}
            />
            <Route
              key="sports"
              path="/sports"
              element={<News pageSize={5} country="us" category="sports" />}
            />
            <Route
              key="technology"
              path="/technology"
              element={<News pageSize={5} country="us" category="technology" />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}
