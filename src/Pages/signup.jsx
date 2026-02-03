import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignupUser } from "../services/userService";

function Signup() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // REGEX (matches backend)
  const usernameRegex = /^[A-Za-z][A-Za-z0-9._]*$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const nameRegex = /^[A-Za-z][A-Za-z' -]*$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

  const handleSignup = async () => {
    setErrorMessage("");

    // Required fields
    if (!username || !email || !password) {
      setErrorMessage("Username, email and password are required");
      return;
    }

    // Username validation
    if (!usernameRegex.test(username)) {
      setErrorMessage(
        "Username must start with a letter and can contain letters, numbers, '.' and '_' only"
      );
      return;
    }

    if (username.includes("@")) {
      setErrorMessage("Username cannot contain '@'");
      return;
    }

    // Email validation
    if (!emailRegex.test(email)) {
      setErrorMessage("Invalid email format");
      return;
    }

    // First name validation
    if (firstName && !nameRegex.test(firstName)) {
      setErrorMessage(
        "First name can only contain letters, spaces, hyphens (-), and apostrophes (')"
      );
      return;
    }

    // Last name validation
    if (lastName && !nameRegex.test(lastName)) {
      setErrorMessage(
        "Last name can only contain letters, spaces, hyphens (-), and apostrophes (')"
      );
      return;
    }

    // Password validation
    if (!passwordRegex.test(password)) {
      setErrorMessage(
        "Password must be at least 8 characters and include uppercase, lowercase, number and special character"
      );
      return;
    }

    try {
      await SignupUser(username, email, password, firstName, lastName);
      navigate("/login");
    } catch (error) {
      // Backend error message
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Signup</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="text"
          placeholder="Username"
          className="w-full mb-3 p-2 border rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="text"
          placeholder="First name"
          className="w-full mb-3 p-2 border rounded"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Last name"
          className="w-full mb-3 p-2 border rounded"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {errorMessage && (
          <div className="text-red-500 text-sm mb-4 text-center">
            {errorMessage}
          </div>
        )}

        <button
          onClick={handleSignup}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Signup
        </button>

        <p className="text-xs mt-2 text-center">
          Already have an account?
          <a href="/login" className="ml-1 font-semibold text-blue-500">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signup;