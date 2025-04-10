import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Contact from "./components/Contact";
import About from "./components/About";
import Home from "./components/Home";
import Prediction from "./components/Prediction";
import Insights from "./components/Insights";
import Marquee from "./components/Marquee";

const App = () => {
  return (
    <Router>
      <Header />
      <Marquee />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/prediction" element={<Prediction />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

      </Routes>
    </Router>
  );
};

export default App;
