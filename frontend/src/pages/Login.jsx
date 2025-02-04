import React, { useState } from "react";

import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import login from "../assets/login.png";

export const Login = () => {
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data.role);
      if (res.ok) {
        if (data.role === "admin") {
          localStorage.setItem("user", JSON.stringify(data));
          navigate("/dashboard");
        } else if (data.role === "officer") {
          localStorage.setItem("user", JSON.stringify(data));
          navigate("/officerDashboard");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-r from-teal-50 to-cyan-50">
        <div className="flex max-w-5xl md:flex-row flex-col mx-auto p-3 px-10 gap-10 md:items-center">
          {/* Left Section - Image */}
          <div className="flex-1">
            <img
              src={login} // Replace with your image path
              alt="Login Illustration"
              className="w-full h-auto rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Right Section - Login Form */}
          <div className="flex-1 pt-5">
            <form
              onSubmit={handleSubmit}
              className="flex max-w-md flex-col gap-6 mt-10 mx-auto pb-20"
            >
              {/* Form Header */}
              <div className="text-center font-semibold text-3xl text-cyan-600">
                <h3>Sign In</h3>
              </div>

              {/* Email Input */}
              <div>
                <div className="mb-2 block">
                  <Label value="Email" className="text-cyan-600 font-medium" />
                </div>
                <TextInput
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  className="rounded-lg border-cyan-200 focus:ring-cyan-500 focus:border-cyan-500"
                  onChange={(e) => {
                    setFormData({ ...formData, [e.target.id]: e.target.value });
                  }}
                />
              </div>

              {/* ID Input */}
              <div>
                <div className="mb-2 block">
                  <Label value="ID" className="text-cyan-600 font-medium" />
                </div>
                <TextInput
                  id="id"
                  type="text"
                  required
                  className="rounded-lg border-cyan-200 focus:ring-cyan-500 focus:border-cyan-500"
                  onChange={(e) => {
                    setFormData({ ...formData, [e.target.id]: e.target.value });
                  }}
                />
              </div>

              {/* Password Input */}
              <div>
                <div className="mb-2 block">
                  <Label
                    value="Password"
                    className="text-cyan-600 font-medium"
                  />
                </div>
                <TextInput
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="rounded-lg border-cyan-200 focus:ring-cyan-500 focus:border-cyan-500"
                  onChange={(e) => {
                    setFormData({ ...formData, [e.target.id]: e.target.value });
                  }}
                />
              </div>

              {/* Show Password Checkbox */}
              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember"
                  className="text-cyan-500 focus:ring-cyan-500"
                  onChange={() => setShowPassword(!showPassword)}
                />
                <Label className="text-cyan-600">Show Password</Label>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
