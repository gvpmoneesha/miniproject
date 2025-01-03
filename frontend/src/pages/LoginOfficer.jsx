import React, { useState } from "react";
import Header from "../components/Header";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import login from "../assets/login.png";

export const LoginOfficer = () => {
  const [formData, setFormData] = useState({});
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
      <div className="bg-teal-400">
        <Header />
      </div>

      <div className="min-h-screen  bg-teal-50">
        <div className="flex max-w-5xl md:flex-row flex-col mx-auto p-3 px-10 gap-10 md:items-center">
          <div className="flex-1">
            <img src={login} className="" />
          </div>
          <div className="flex-1 pt-5">
            <form
              onSubmit={handleSubmit}
              className="flex max-w-md flex-col gap-6 mt-10 mx-auto pb-20"
            >
              <div className="text-center font-semibold text-3xl text-cyan-600">
                <h3>Sign In</h3>
              </div>
              <div>
                <div className="mb-2 block">
                  <Label value="Email" />
                </div>
                <TextInput
                  id="email"
                  type="email"
                  placeholder="name@flowbite.com"
                  required
                  onChange={(e) => {
                    setFormData({ ...formData, [e.target.id]: e.target.value });
                  }}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label value="Id" />
                </div>
                <TextInput
                  id="id"
                  type="text"
                  required
                  onChange={(e) => {
                    setFormData({ ...formData, [e.target.id]: e.target.value });
                  }}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label value="Password" />
                </div>
                <TextInput
                  id="password"
                  type="password"
                  required
                  onChange={(e) => {
                    setFormData({ ...formData, [e.target.id]: e.target.value });
                  }}
                />
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="remember" />
                <Label>Show me</Label>
              </div>
              <Button type="submit">Submit</Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
