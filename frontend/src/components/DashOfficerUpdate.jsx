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

const DashOfficerUpdate = () => {
  const [formData, setFormData] = useState({ role: "officer" });

  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(0);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [searchId, setSearchId] = useState(null);
  const [user, setUser] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

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
            setImageUrl(downloadURL);
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

  const handleSearchId = (e) => {
    setSearchId(e.target.value);
  };

  const handleSearchUser = async () => {
    try {
      const res = await fetch(`/api/v1/user/getofficer/${searchId}`);

      if (!res.ok) {
        return;
      } else {
        const data = await res.json();

        if (data.role == "officer") {
          setUser(data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(formData).length === 0) {
      console.log("There are no changes");
      return;
    }

    if (imageUploadProgress) {
      console.log("Please wait for uploading image");
      return;
    }
    try {
      const res = await fetch(`/api/v1/user/update/${searchId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      console.log(res);
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        console.log("error");
      } else {
        console.log("Update is success");
      }
    } catch (error) {
      console.log("error here");
    }
  };

  console.log("user", user);
  console.log("form", formData);

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-50 to-cyan-50 flex items-center justify-center p-6">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-2xl overflow-hidden p-6">
        {/* Page Heading */}
        <div className="text-center text-teal-700 py-6">
          <h2 className="font-bold text-3xl sm:text-4xl">Officer Update</h2>
        </div>

        {/* Search Section */}
        <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg shadow-sm mt-6">
          <div className="mb-2 block">
            <Label value="ID" className="text-cyan-600 font-medium" />
          </div>
          <TextInput
            id="id"
            type="text"
            required
            className="rounded-lg border-cyan-200 focus:ring-cyan-500 focus:border-cyan-500"
            onChange={handleSearchId}
          />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
            onClick={handleSearchUser}
            className="transition-all duration-300 transform hover:scale-105"
          >
            Search
          </Button>
        </div>

        {/* Update Form */}
        <div className="pt-6">
          {user && (
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              {/* Profile Picture */}
              <div className="mb-2 block">
                <img
                  className="rounded-full h-28 w-28 mx-auto object-cover bg-gray-500"
                  src={imageUrl || user.profilePicture}
                  alt="Profile"
                />
              </div>

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
                  defaultValue={user?.name || ""}
                  onChange={handleTextboxDataChange}
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
                  type="password"
                  placeholder="Enter your password"
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
                  defaultValue={user?.id || ""}
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
                  defaultDate={new Date(user.dob)}
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
                  defaultValue={user?.email || ""}
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
                  defaultValue={user?.nic || ""}
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
                  defaultValue={user?.phoneNumber || ""}
                  onChange={handleTextboxDataChange}
                />
              </div>

              {/* Address Input */}
              <div>
                <div className="mb-2 block">
                  <Label
                    value="Address"
                    className="text-cyan-600 font-medium"
                  />
                </div>
                <TextInput
                  id="address"
                  type="text"
                  placeholder="Enter your address"
                  required
                  className="rounded-lg border-cyan-200 focus:ring-cyan-500 focus:border-cyan-500"
                  defaultValue={user?.address || ""}
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
                  <option>{user?.pStation || "Select Police Station"}</option>
                  <option value="Matara">Matara</option>
                  <option value="Galle">Galle</option>
                  <option value="Colombo">Colombo</option>
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
                    Update Officer
                  </Button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashOfficerUpdate;
