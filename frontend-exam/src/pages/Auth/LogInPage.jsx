import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import Logo from "../../assets/icons/logo.png";
import dummyDb from "../../db/db.json";

const LogInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gray-100">
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
      <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-xl">
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
          <Input
            label="Password"
            type="password"
            required="required"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 w-full bg-white"
          />
          <Button
            type="submit"
            disabled={!isFormValid}
            className={`w-full ${isFormValid ? "bg-black hover:bg-gray-800" : "bg-[#CAC9C7] cursor-not-allowed"}`}
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