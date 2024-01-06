import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../components/AuthProvider";

const Register = () => {
  const { login } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    const form = event.target;
    const username = form.username.value;
    const password = form.password.value;
    const repeatPassword = form.repeatPassword.value;
    const email = form.email.value;

    if (password !== repeatPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, email }),
      });

      if (response.ok) {
        const { token, user } = await response.json();
        login(token, user);
        alert("Registration Successful");
        navigate("/user");
      } else {
        const { message } = await response.json();
        setError(message || "Registration failed. Please try again.");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold">Register Form</h1>
            </div>
            <div className="divide-y divide-gray-200">
              <form
                onSubmit={handleRegister}
                className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7"
              >
                <div className="relative">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                    placeholder="Username"
                    required
                  />
                </div>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                    placeholder="Password"
                    required
                  />
                </div>
                <div className="relative">
                  <input
                    id="repeatPassword"
                    name="repeatPassword"
                    type="password"
                    className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                    placeholder="Repeat Password"
                    required
                  />
                </div>
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                    placeholder="Email"
                    required
                  />
                </div>

                {error ? <p className="text-red-600">{error}</p> : ""}

                <p>
                  Already have an account?{" "}
                  <Link to="/login" className="text-blue-600 underline">
                    Login here
                  </Link>
                </p>
                <div className="relative">
                  <button className="bg-blue-500 text-white rounded-md px-6 py-2">
                    Register
                  </button>
                </div>
              </form>
            </div>
            <hr />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
