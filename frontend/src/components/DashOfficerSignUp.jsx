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
    <div className="   max-w-lg p-3 mx-auto ">
      <div>
        <div className="text-center text-teal-700 ">
          <h2 className=" font-bold text-3xl sm:text-5xl pt-10">
            Officer Registration
          </h2>
        </div>
      </div>

      <div className=" pt-14 ">
        <div>
          <form className="gap-4  " onSubmit={handleSubmit}>
            <div>
              <div className="mb-2 block">
                <Label value="Name" />
              </div>
              <TextInput
                id="name"
                type="text"
                placeholder="moneeshakavindi"
                required
                shadow
                onChange={handleTextboxDataChange}
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label value=" Password" />
              </div>
              <TextInput
                id="password"
                type="password"
                required
                shadow
                onChange={handleTextboxDataChange}
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label value=" ID" />
              </div>
              <TextInput
                id="id"
                type="text"
                required
                shadow
                onChange={handleTextboxDataChange}
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label value=" Date of Birth" />
              </div>
              <div>
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
                />
              </div>
            </div>

            <div>
              <div className="mb-2 block">
                <Label
                  value="
                 Email"
                />
              </div>
              <TextInput
                id="email"
                type="email"
                placeholder="name@flowbite.com"
                required
                shadow
                onChange={handleTextboxDataChange}
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label
                  value="
                 NIC Number"
                />
              </div>
              <TextInput
                id="nic"
                type="text"
                required
                shadow
                onChange={handleTextboxDataChange}
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="phoneNumber"
                  value="
                 Phone Number"
                />
              </div>
              <TextInput
                id="phoneNumber"
                type="text"
                required
                shadow
                onChange={handleTextboxDataChange}
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="address"
                  value="
                 Address"
                />
              </div>
              <TextInput
                id="address"
                type="text"
                required
                shadow
                onChange={handleTextboxDataChange}
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="pStation" value="Police Station" />
              </div>
              <Select id="pStation" required onChange={handleTextboxDataChange}>
                <option>Select Police Station</option>
                <option>Matara</option>
                <option>Galle</option>
                <option>Colombo</option>
              </Select>
            </div>

            <div>
              <div className="mb-2 block">
                <Label value="Profile Picture" />
              </div>
              <div className="flex  gap-5 items-center justify-between ">
                <FileInput
                  id="file-upload-helper-text"
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <Button
                  type="button"
                  gradientDuoTone="purpleToBlue"
                  size="sm"
                  outline
                  onClick={handleUploadImage}
                >
                  Upload Image
                </Button>
              </div>
            </div>
            {imageUploadError && (
              <Alert color="failure">{imageUploadError}</Alert>
            )}

            <div className="pt-4 ">
              {imageUploadProgress >= 1 && imageUploadProgress <= 99 ? (
                <Button type="submit" disabled className="w-full">
                  Loading....
                </Button>
              ) : (
                <Button type="submit" className="w-full">
                  Register new account
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
