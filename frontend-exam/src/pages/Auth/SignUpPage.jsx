import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import Logo from "../../assets/icons/logo.png";
import dummyDb from "../../db/db.json";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gray-100">
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
      <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-xl">
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
          <Input
            label="Password"
            type="password"
            required="required"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 w-full bg-white"
          />
          <Input
            label="Confirm Password"
            type="password"
            required="required"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="p-2 w-full bg-white"
          />
          <Button
            type="submit"
            disabled={!isFormValid}
            className={`w-full ${isFormValid ? "bg-black hover:bg-gray-800" : "bg-[#CAC9C7]"}`}
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