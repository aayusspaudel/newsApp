import './App.css';
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from "react-top-loading-bar";

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

const App = () => {

  const apiKey = process.env.REACT_APP_NEWS_API;

  const [progress, setProgress] = useState(0);

  return (
    <Router>
      <Navbar />

      <LoadingBar
        height={3}
        color="lightgreen"
        progress={progress}
      />

      <Routes>

        
        <Route
          path="/"
          element={
            <News
              key="home"
              apiKey={apiKey}
              setProgress={setProgress}
              pageSize={5}
              country="us"
              category="general"
            />
          }
        />



        <Route
          path="/business"
          element={
            <News
              key="business"
              apiKey={apiKey}
              setProgress={setProgress}
              pageSize={5}
              country="us"
              category="business"
            />
          }
        />

        <Route
          path="/entertainment"
          element={
            <News
              key="entertainment"
              apiKey={apiKey}
              setProgress={setProgress}
              pageSize={5}
              country="us"
              category="entertainment"
            />
          }
        />

        <Route
          path="/health"
          element={
            <News
              key="health"
              apiKey={apiKey}
              setProgress={setProgress}
              pageSize={5}
              country="us"
              category="health"
            />
          }
        />

        <Route
          path="/science"
          element={
            <News
              key="science"
              apiKey={apiKey}
              setProgress={setProgress}
              pageSize={5}
              country="us"
              category="science"
            />
          }
        />

        <Route
          path="/sports"
          element={
            <News
              key="sports"
              apiKey={apiKey}
              setProgress={setProgress}
              pageSize={5}
              country="us"
              category="sports"
            />
          }
        />

        <Route
          path="/technology"
          element={
            <News
              key="technology"
              apiKey={apiKey}
              setProgress={setProgress}
              pageSize={5}
              country="us"
              category="technology"
            />
          }
        />

      </Routes>
    </Router>
  );
};

export default App;
