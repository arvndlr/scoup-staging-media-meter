import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import Logo from "../../assets/icons/logo.png";
import dummyDb from "../../db/db.json";

// Import the eye icons from @tabler/icons-react
import { IconEyeClosed } from '@tabler/icons-react';

const LogInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // New state to toggle password visibility
  const navigate = useNavigate();

  const isFormValid = email !== "" && password !== "";

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = dummyDb.users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      alert("Login successful!");
      console.log("Logged in user:", user);

      // Check onboarding status and redirect accordingly
      if (user.onboardingStatus === "incomplete") {
        navigate("/onboarding/account-info");
      } else {
        navigate("/dashboard");
      }
    } else {
      alert("Login failed. Invalid email or password.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-[#f9f8f4]">
      <div>
        <div className="flex justify-center">
          <img src={Logo} alt="Logo" className="h-10 w-10" />
        </div>
        <h2 className="mt-4 text-center text-3xl font-extrabold text-gray-900">
          Log in to your account
        </h2>
        <p className="mt-1 mb-4 text-center text-sm text-gray-600">
          Welcome back! Please enter your details.
        </p>
      </div>
      <div className="w-full max-w-sm rounded-3xl bg-[#faf9f5] p-6 shadow-xl">
        <form className="space-y-3" onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            required="required"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 w-full bg-white"
          />
          <div className="relative">
            <Input
              label="Password"
              // Dynamically change input type based on showPassword state
              type={showPassword ? "text" : "password"}
              required="required"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 w-full pr-10" // Add padding to make space for the icon
            />
            {/* Toggle button with conditional icon rendering */}
            <button
              type="button" // Use type="button" to prevent form submission
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pr-5 pt-6 flex items-center  text-gray-400"
            >
              {showPassword ? (
                <IconEyeClosed stroke={2} className="h-5 w-5" />
              ) : (
                <IconEyeClosed stroke={2} className="h-5 w-5" />
              )}
            </button>
          </div>
          <Button
            type="submit"
            disabled={!isFormValid}
            className={`w-full ${isFormValid ? "bg-black hover:bg-[#121212] hover:text-[#ffba49]" : "bg-[#9c9b99] cursor-not-allowed"}`}
          >
            SIGN IN
          </Button>
          <div className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-bold text-black hover:text-gray-500"
            >
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogInPage;