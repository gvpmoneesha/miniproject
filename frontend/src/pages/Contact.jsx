import React, { useEffect, useState } from "react";
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

export const Contact = () => {
  const [formData, setFormData] = useState({});
  const [stations, setStations] = useState({});
  const [stationEmail, setStationEmail] = useState("");
  const [stationNumber, setStationNumber] = useState("");

  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(0);
  const [imageUploadError, setImageUploadError] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchValues = async () => {
      await fetch("/api/v1/static//getstaticvalue/station")
        .then((res) => res.json())
        .then((data) => setStations(data));
    };
    fetchValues();
  }, []);

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
            setFormData({ ...formData, image: downloadURL });
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
      const res = await fetch(`/api/v1/complain/complainadd`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(res);

      if (res.ok) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleStationSelect = async (e) => {
    const result = await stations.data.value.find(
      (item) => item.name === e.target.value
    );
    if (e.target.value !== "Stations") {
      setStationEmail(result.email);
      setStationNumber(result.phone);
    } else {
      setStationEmail("Stations");
      setStationNumber("Phone");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-50 to-cyan-50 flex items-center justify-center p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Main Heading */}
        <div className="text-center text-teal-700 py-10">
          <h2 className="font-bold text-3xl sm:text-5xl">
            Complaint and Contact
          </h2>
        </div>

        <div className="flex flex-col md:flex-row gap-10 p-8">
          {/* Left Side - Complaint Form */}
          <div className="flex-1">
            <div className="text-center text-teal-700 mb-8">
              <h2 className="font-bold text-2xl sm:text-4xl">Complaint Form</h2>
            </div>

            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
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

              {/* Complaint Textarea */}
              <div>
                <div className="mb-2 block">
                  <Label
                    value="Complaint"
                    className="text-cyan-600 font-medium"
                  />
                </div>
                <textarea
                  id="complain"
                  rows="5"
                  className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-cyan-200 focus:ring-cyan-500 focus:border-cyan-500"
                  placeholder="Describe your complaint..."
                  onChange={handleTextboxDataChange}
                ></textarea>
              </div>

              {/* Image Upload */}
              <div>
                <div className="mb-2 block">
                  <Label
                    value="Upload Image"
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
                    Submit
                  </Button>
                )}
              </div>
            </form>
          </div>

          {/* Right Side - Contact Information */}
          <div className="flex-1">
            <div className="text-center text-teal-700 mb-8">
              <h2 className="font-bold text-2xl sm:text-4xl">
                Contact Information
              </h2>
            </div>

            <div className="flex flex-col gap-6">
              {/* Police Station Select */}
              <div>
                <div className="mb-2 block">
                  <Label
                    value="Police Station"
                    className="text-cyan-600 font-medium"
                  />
                </div>
                <Select
                  id="station"
                  required
                  className="rounded-lg border-cyan-200 focus:ring-cyan-500 focus:border-cyan-500"
                  onChange={(e) => handleStationSelect(e)}
                >
                  <option>Select Station</option>
                  {stations &&
                    stations.data?.value.map((s, index) => (
                      <option key={index}>{s.name}</option>
                    ))}
                </Select>
              </div>

              {/* Police Station Email */}
              <div>
                <div className="mb-2 block">
                  <Label
                    value="Police Station Email"
                    className="text-cyan-600 font-medium"
                  />
                </div>
                <TextInput
                  id="email"
                  type="email"
                  placeholder="Email"
                  required
                  readOnly
                  className="rounded-lg border-cyan-200 focus:ring-cyan-500 focus:border-cyan-500"
                  value={stationEmail || ""}
                />
              </div>

              {/* Police Station Phone Number */}
              <div>
                <div className="mb-2 block">
                  <Label
                    value="Police Station Phone Number"
                    className="text-cyan-600 font-medium"
                  />
                </div>
                <TextInput
                  id="phone"
                  type="number"
                  placeholder="Phone"
                  required
                  readOnly
                  className="rounded-lg border-cyan-200 focus:ring-cyan-500 focus:border-cyan-500"
                  value={stationNumber || ""}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
