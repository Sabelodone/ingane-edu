import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeContext";
import { ProgressProvider } from "./components/ProgressContext";
import { LanguageProvider } from "./components/LanguageContext";
import { AuthProvider } from "./components/AuthContext";
import ErrorBoundary from "./components/ErrorBoundary";

import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Izindatshana from "./pages/Izindatshana";
import Ukuphicaphica from "./pages/Ukuphicaphica";
import Izinganekwane from "./pages/Izinganekwane";
import Izisho from "./pages/Izisho";
import Onkamisa from "./pages/Onkamisa";
import Imisindo from "./pages/Imisindo";

import './App.css';

const App = () => {
  // Log components rendering to check if they're properly mounted
  useEffect(() => {
    console.log("App component mounted");
  }, []);

  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <ProgressProvider>
            <LanguageProvider>
              <ErrorBoundary>
                <div className="App">
                  {/* Navigation Component */}
                  <Navigation />
                  <Routes>
                    {/* Route paths */}
                    <Route path="/" element={<Home />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/izindatshana" element={<Izindatshana />} />
                    <Route path="/ukuphicaphica" element={<Ukuphicaphica />} />
                    <Route path="/izinganekwane" element={<Izinganekwane />} />
                    <Route path="/izisho" element={<Izisho />} />
                    <Route path="/onkamisa" element={<Onkamisa />} />
                    <Route path="/imisindo" element={<Imisindo />} />
                  </Routes>
                  {/* Footer Component */}
                  <Footer />
                </div>
              </ErrorBoundary>
            </LanguageProvider>
          </ProgressProvider>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
