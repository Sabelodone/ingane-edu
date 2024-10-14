import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Features from './components/Features';
import Izindatshana from './components/Izindatshana'; // Import the new Izindatshana component
import CombinedPage from './components/CombinePage';
import LearnMorePage from './components/LearnMorePage';
import Dashboard from './components/Dashboard';
import { AuthProvider } from './components/AuthContext';
import { LanguageProvider } from './LanguageContext';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <Router>
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route 
              path="/features" 
              element={
                <ProtectedRoute>
                  <Features />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/izindatshana" 
              element={
                <ProtectedRoute>
                  <Izindatshana />
                </ProtectedRoute>
              } 
            />
            <Route path="/learn-more" element={<LearnMorePage />} />
            <Route path="/dashboard" element={<Dashboard />} /> {/* Dashboard route */}
            <Route path="/" element={<CombinedPage />} />
            <Route path="*" element={<Navigate to="/signin" />} />
          </Routes>
          <Footer />
        </Router>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;
