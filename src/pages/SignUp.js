import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import AnimatedCharacter from "../components/AnimatedCharacter";
import { GoogleLogin } from "@react-oauth/google";
import FacebookLogin from "react-facebook-login";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign-up logic here
    console.log("Signing up with:", username, email, password);
  };

  const handleGoogleResponse = (response) => {
    console.log("Google response:", response);
    // Handle Google login response
  };

  const handleFacebookResponse = (response) => {
    console.log("Facebook response:", response);
    // Handle Facebook login response
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl p-8 shadow-lg max-w-md w-full"
      >
        <h1 className="text-4xl font-bold text-center mb-6 text-primary">Bhalisa Lapha!</h1>
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
              placeholder="Khetha igama lomsebenzisi"
              required
            />
          </div>
          <div>
            <Label htmlFor="email" className="text-lg font-medium text-secondary">
              I-imeyili
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-full border-2 border-accent focus:border-primary transition duration-300"
              placeholder="Faka i-imeyili yakho"
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
              placeholder="Khetha iphasiwedi"
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-accent hover:bg-accent-hover text-white font-bold py-3 rounded-full text-xl transition duration-300 transform hover:scale-105"
          >
            Bhalisa
          </Button>
        </form>
        <div className="mt-6 space-y-4">
          <GoogleLogin
            onSuccess={handleGoogleResponse}
            onError={() => console.log("Google login failed")}
            useOneTap
            shape="pill"
            size="large"
            text="signup_with"
            theme="filled_blue"
          />
          <FacebookLogin
            appId="your-facebook-app-id" // Replace with your Facebook app ID
            autoLoad={false}
            fields="name,email,picture"
            callback={handleFacebookResponse}
            icon="fa-facebook"
            textButton="Sign up with Facebook"
            cssClass="w-full py-3 bg-blue-600 rounded-full text-white font-bold text-lg"
          />
        </div>
        <p className="mt-6 text-center text-secondary">
          Usuvele unayo i-akhawunti?{" "}
          <Link to="/signin" className="text-accent hover:underline font-bold">
            Ngena Lapha
          </Link>
        </p>
      </motion.div>
      <AnimatedCharacter />
    </div>
  );
};

export default SignUp;