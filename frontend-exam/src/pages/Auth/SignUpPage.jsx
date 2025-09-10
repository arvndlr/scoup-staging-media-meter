import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import Logo from "../../assets/icons/logo.png";
import dummyDb from "../../db/db.json";

// Import both eye icons
import { IconEye, IconEyeClosed } from '@tabler/icons-react';

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // State for password visibility
  const [showPassword, setShowPassword] = useState(false);
  // State for confirm password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const isFormValid = email !== "" && password !== "" && confirmPassword !== "";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const userExists = dummyDb.users.some((user) => user.email === email);
    if (userExists) {
      alert("A user with this email already exists.");
      return;
    }

    const newUser = {
      id: (dummyDb.users.length + 1).toString(),
      email: email,
      password: password,
      accountInfo: {},
      keywords: {},
      sources: {},
      onboardingStatus: "incomplete",
    };

    dummyDb.users.push(newUser);
    console.log("New user signed up:", newUser);
    alert("Account created successfully! Redirecting to onboarding...");

    // Redirect to the first onboarding page
    navigate("/onboarding/account-info");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-[#f9f8f4]">
      <div>
        <div className="flex justify-center">
          <img src={Logo} alt="Logo" className="h-10 w-10" />
        </div>
        <h2 className="mt-4 text-center text-3xl font-extrabold text-gray-900">
          Create an account
        </h2>
        <p className="mt-1 mb-4 text-center text-sm text-gray-600">
          Get instant access and start creating today.
        </p>
      </div>
      <div className="w-full max-w-sm rounded-3xl bg-[#faf9f5] p-6 shadow-xl">
        <form className="space-y-3" onSubmit={handleSubmit}>
          <Input
            label="Email address"
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
              type={showPassword ? "text" : "password"}
              required="required"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 w-full pr-10 bg-white"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 pt-6 flex items-center text-gray-400"
            >
              {showPassword ? (
                <IconEyeClosed stroke={2} className="h-5 w-5" />
              ) : (
                <IconEyeClosed stroke={2} className="h-5 w-5" />
              )}
            </button>
          </div>
          <div className="relative">
            <Input
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              required="required"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="p-2 w-full pr-10 bg-white"
            />
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 pt-6 flex items-center text-gray-400"
            >
              {showConfirmPassword ? (
                <IconEyeClosed stroke={2} className="h-5 w-5" />
              ) : (
                <IconEyeClosed stroke={2} className="h-5 w-5" />
              )}
            </button>
          </div>
          <Button
            type="submit"
            disabled={!isFormValid}
            className={`w-full ${isFormValid ? "bg-black hover:bg-[#121212] hover:text-[#ffba49]" : "bg-[#CAC9C7]"}`}
          >
            CREATE ACCOUNT
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-bold text-black hover:text-gray-500"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;