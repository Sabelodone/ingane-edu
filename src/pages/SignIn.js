import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import AnimatedCharacter from "../components/AnimatedCharacter";
import { Link } from 'react-router-dom';


const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign-in logic here
    console.log("Signing in with:", username, password);
    
    // Redirect to the dashboard after successful sign-in
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl p-8 shadow-lg max-w-md w-full"
      >
        <h1 className="text-4xl font-bold text-center mb-6 text-primary">Ngena Lapha!</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="username" className="text-lg font-medium text-secondary">
              Igama Lomsebenzisi
            </Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 rounded-full border-2 border-accent focus:border-primary transition duration-300"
              placeholder="Faka igama lakho lomsebenzisi"
              required
            />
          </div>
          <div>
            <Label htmlFor="password" className="text-lg font-medium text-secondary">
              Iphasiwedi
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-full border-2 border-accent focus:border-primary transition duration-300"
              placeholder="Faka iphasiwedi yakho"
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-accent hover:bg-accent-hover text-white font-bold py-3 rounded-full text-xl transition duration-300 transform hover:scale-105"
          >
            Ngena
          </Button>
        </form>
        <p className="mt-6 text-center text-secondary">
          Awunayo i-akhawunti?{" "}
          <Link to="/signup" className="text-accent hover:underline font-bold">
            Bhalisela Lapha
          </Link>
        </p>
      </motion.div>
      <AnimatedCharacter />
    </div>
  );
};

export default SignIn;
