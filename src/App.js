import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Features from './components/Features';
import Izindatshana from './components/Izindatshana';
import CombinedPage from './components/CombinePage';
import LearnMorePage from './components/LearnMorePage'; // Import the LearnMorePage component
import { AuthProvider, useAuth } from './AuthContext';
import { LanguageProvider } from './LanguageContext';
import Footer from './components/Footer';

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
            <Route path="/story" element={<Izindatshana />} />
            <Route path="/learn-more" element={<LearnMorePage />} /> {/* Add the route here */}
            <Route path="/" element={<CombinedPage />} />
          </Routes>
          <Footer />
        </Router>
      </LanguageProvider>
    </AuthProvider>
  );
}

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/signin" />;
};

export default App;
