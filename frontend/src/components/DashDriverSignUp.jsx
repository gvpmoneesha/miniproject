import React, { useContext, useState } from "react";
import {
  Button,
  Checkbox,
  Label,
  TextInput,
  Datepicker,
  Select,
  FileInput,
  Alert,
} from "flowbite-react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const DashDriverSignUp = () => {
  const { authUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({ role: "driver" });

  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(0);
  const [imageUploadError, setImageUploadError] = useState(null);

  const navigate = useNavigate();

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("Plese select the image");
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError("Image upload failed");
          setImageUploadProgress(0);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(0);
            setImageUploadError(null);
            setFormData({ ...formData, profilePicture: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError("Image upload failed");
      setImageUploadProgress(0);
    }
  };

  const handleTextboxDataChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/v1/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(res);

      if (res.ok) {
        await fetch("/api/v1/activity/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "driver-create",
            createdBy: authUser.id,
          }),
        });
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(formData);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-teal-600 to-blue-600 p-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Driver Registration
          </h2>
          <p className="mt-2 text-teal-100">
            Complete your professional driver profile
          </p>
        </div>

        {/* Form Section */}
        <div className="p-6 sm:p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information Column */}
              <div className="space-y-5">
                <div>
                  <Label
                    htmlFor="name"
                    value="Full Name"
                    className="block mb-2 font-medium text-gray-700"
                  />
                  <TextInput
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    required
                    shadow
                    className="border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    onChange={handleTextboxDataChange}
                  />
                </div>

                <div>
                  <Label
                    htmlFor="password"
                    value="Password"
                    className="block mb-2 font-medium text-gray-700"
                  />
                  <TextInput
                    id="password"
                    type="password"
                    required
                    shadow
                    className="border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    onChange={handleTextboxDataChange}
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Minimum 8 characters with numbers and symbols
                  </p>
                </div>

                <div>
                  <Label
                    htmlFor="id"
                    value="Driver ID"
                    className="block mb-2 font-medium text-gray-700"
                  />
                  <TextInput
                    id="id"
                    type="text"
                    required
                    shadow
                    className="border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    onChange={handleTextboxDataChange}
                  />
                </div>

                <div>
                  <Label
                    htmlFor="email"
                    value="Email Address"
                    className="block mb-2 font-medium text-gray-700"
                  />
                  <TextInput
                    id="email"
                    type="email"
                    placeholder="john.doe@example.com"
                    required
                    shadow
                    className="border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    onChange={handleTextboxDataChange}
                  />
                </div>
              </div>

              {/* Identification Column */}
              <div className="space-y-5">
                <div>
                  <Label
                    htmlFor="nic"
                    value="NIC Number"
                    className="block mb-2 font-medium text-gray-700"
                  />
                  <TextInput
                    id="nic"
                    type="text"
                    placeholder="123456789V"
                    required
                    shadow
                    className="border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    onChange={handleTextboxDataChange}
                  />
                </div>

                <div>
                  <Label
                    htmlFor="dob"
                    value="Date of Birth"
                    className="block mb-2 font-medium text-gray-700"
                  />
                  <Datepicker
                    id="dob"
                    onSelectedDateChanged={(date) => {
                      const dob =
                        date.getFullYear() +
                        "-" +
                        (date.getMonth() + 1) +
                        "-" +
                        date.getDate();
                      setFormData({ ...formData, dob });
                    }}
                    className="border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>

                <div>
                  <Label
                    htmlFor="phoneNumber"
                    value="Phone Number"
                    className="block mb-2 font-medium text-gray-700 mt-10"
                  />
                  <TextInput
                    id="phoneNumber"
                    type="text"
                    placeholder="0771234567"
                    required
                    shadow
                    className="border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    onChange={handleTextboxDataChange}
                  />
                </div>

                <div>
                  <Label
                    htmlFor="address"
                    value="Address"
                    className="block mb-2 font-medium text-gray-700"
                  />
                  <TextInput
                    id="address"
                    type="text"
                    required
                    shadow
                    className="border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    onChange={handleTextboxDataChange}
                  />
                </div>
              </div>
            </div>

            {/* Vehicle Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label
                  htmlFor="vType"
                  value="Vehicle Type"
                  className="block mb-2 font-medium text-gray-700"
                />
                <Select
                  id="vType"
                  required
                  onChange={handleTextboxDataChange}
                  className="border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                >
                  <option>Select Vehicle Type</option>
                  <option>Heavy</option>
                  <option>Semi</option>
                  <option>Normal</option>
                </Select>
              </div>

              <div>
                <Label
                  htmlFor="model"
                  value="Vehicle Model"
                  className="block mb-2 font-medium text-gray-700"
                />
                <Select
                  id="model"
                  required
                  onChange={handleTextboxDataChange}
                  className="border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                >
                  <option>Select Vehicle Model</option>
                  <option>Car</option>
                  <option>Van</option>
                  <option>Bus</option>
                </Select>
              </div>
            </div>

            {/* Profile Picture Upload */}
            <div>
              <Label
                value="Profile Picture"
                className="block mb-2 font-medium text-gray-700"
              />
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
                <FileInput
                  id="file-upload-helper-text"
                  type="file"
                  className="border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <Button
                  type="button"
                  gradientDuoTone="purpleToBlue"
                  size="sm"
                  outline
                  onClick={handleUploadImage}
                  className="transition-all hover:scale-[1.02] active:scale-95"
                >
                  {imageUploadProgress > 0 ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      Uploading ({imageUploadProgress}%)
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      Upload Image
                    </span>
                  )}
                </Button>
              </div>
              {imageUploadError && (
                <Alert color="failure" className="mt-3">
                  {imageUploadError}
                </Alert>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                gradientDuoTone="tealToBlue"
                className="w-full py-3 font-medium text-lg transition-all hover:scale-[1.01] active:scale-95"
                disabled={imageUploadProgress >= 1 && imageUploadProgress <= 99}
              >
                {imageUploadProgress >= 1 && imageUploadProgress <= 99 ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Processing...
                  </span>
                ) : (
                  "Register Driver"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
