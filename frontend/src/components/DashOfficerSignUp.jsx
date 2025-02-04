import React, { useState } from "react";
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

const DashOfficerSignUp = () => {
  const [formData, setFormData] = useState({ role: "officer" });

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

  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/v1/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-50 to-cyan-50 flex items-center justify-center p-6">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-2xl overflow-hidden p-6">
        {/* Page Heading */}
        <div className="text-center text-teal-700 py-6">
          <h2 className="font-bold text-3xl sm:text-4xl">
            Officer Registration
          </h2>
        </div>

        {/* Registration Form */}
        <div className="pt-6">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {/* Name Input */}
            <div>
              <div className="mb-2 block">
                <Label value="Name" className="text-cyan-600 font-medium" />
              </div>
              <TextInput
                id="name"
                type="text"
                placeholder="Enter your name"
                required
                className="rounded-lg border-cyan-200 focus:ring-cyan-500 focus:border-cyan-500"
                onChange={handleTextboxDataChange}
              />
            </div>

            {/* Password Input */}
            <div>
              <div className="mb-2 block">
                <Label value="Password" className="text-cyan-600 font-medium" />
              </div>
              <TextInput
                id="password"
                type="password"
                placeholder="Enter your password"
                required
                className="rounded-lg border-cyan-200 focus:ring-cyan-500 focus:border-cyan-500"
                onChange={handleTextboxDataChange}
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
                placeholder="Enter your ID"
                required
                className="rounded-lg border-cyan-200 focus:ring-cyan-500 focus:border-cyan-500"
                onChange={handleTextboxDataChange}
              />
            </div>

            {/* Date of Birth Input */}
            <div>
              <div className="mb-2 block">
                <Label
                  value="Date of Birth"
                  className="text-cyan-600 font-medium"
                />
              </div>
              <Datepicker
                onSelectedDateChanged={(date) => {
                  const dob =
                    date.getFullYear() +
                    "-" +
                    (date.getMonth() + 1) +
                    "-" +
                    date.getDate();
                  setFormData({ ...formData, dob });
                }}
                className="rounded-lg border-cyan-200 focus:ring-cyan-500 focus:border-cyan-500"
              />
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
                onChange={handleTextboxDataChange}
              />
            </div>

            {/* NIC Number Input */}
            <div>
              <div className="mb-2 block">
                <Label
                  value="NIC Number"
                  className="text-cyan-600 font-medium"
                />
              </div>
              <TextInput
                id="nic"
                type="text"
                placeholder="Enter your NIC number"
                required
                className="rounded-lg border-cyan-200 focus:ring-cyan-500 focus:border-cyan-500"
                onChange={handleTextboxDataChange}
              />
            </div>

            {/* Phone Number Input */}
            <div>
              <div className="mb-2 block">
                <Label
                  value="Phone Number"
                  className="text-cyan-600 font-medium"
                />
              </div>
              <TextInput
                id="phoneNumber"
                type="text"
                placeholder="Enter your phone number"
                required
                className="rounded-lg border-cyan-200 focus:ring-cyan-500 focus:border-cyan-500"
                onChange={handleTextboxDataChange}
              />
            </div>

            {/* Address Input */}
            <div>
              <div className="mb-2 block">
                <Label value="Address" className="text-cyan-600 font-medium" />
              </div>
              <TextInput
                id="address"
                type="text"
                placeholder="Enter your address"
                required
                className="rounded-lg border-cyan-200 focus:ring-cyan-500 focus:border-cyan-500"
                onChange={handleTextboxDataChange}
              />
            </div>

            {/* Police Station Select */}
            <div>
              <div className="mb-2 block">
                <Label
                  value="Police Station"
                  className="text-cyan-600 font-medium"
                />
              </div>
              <Select
                id="pStation"
                required
                className="rounded-lg border-cyan-200 focus:ring-cyan-500 focus:border-cyan-500"
                onChange={handleTextboxDataChange}
              >
                <option>Select Police Station</option>
                <option>Matara</option>
                <option>Galle</option>
                <option>Colombo</option>
              </Select>
            </div>

            {/* Profile Picture Upload */}
            <div>
              <div className="mb-2 block">
                <Label
                  value="Profile Picture"
                  className="text-cyan-600 font-medium"
                />
              </div>
              <div className="flex gap-5 items-center">
                <FileInput
                  id="file-upload-helper-text"
                  type="file"
                  className="rounded-lg border-cyan-200 focus:ring-cyan-500 focus:border-cyan-500"
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <Button
                  type="button"
                  gradientDuoTone="purpleToBlue"
                  size="sm"
                  outline
                  onClick={handleUploadImage}
                  className="transition-all duration-300 transform hover:scale-105"
                >
                  Upload Image
                </Button>
              </div>
            </div>

            {/* Error Message */}
            {imageUploadError && (
              <Alert color="failure" className="mt-4">
                {imageUploadError}
              </Alert>
            )}

            {/* Submit Button */}
            <div className="pt-4">
              {imageUploadProgress >= 1 && imageUploadProgress <= 99 ? (
                <Button
                  type="submit"
                  disabled
                  className="w-full bg-cyan-600 hover:bg-cyan-700"
                >
                  Loading...
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-full bg-cyan-600 hover:bg-cyan-700"
                >
                  Add New Officer
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DashOfficerSignUp;
