import React from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Form from "./Form";
import Home from "./Home";

const App = () => {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    );
  };
  
  export default App;