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
    <div className=" min-h-screen  max-w-lg p-3 mx-auto ">
      <div>
        <div className="text-center text-teal-700 ">
          <h2 className=" font-bold text-3xl sm:text-5xl pt-10">
            Officer Update
          </h2>
        </div>
      </div>

      <div className="flex items-center gap-10 pt-24 px-10">
        <div className="mb-2 block">
          <Label
            value="
                 Id-:"
          />
        </div>

        <div>
          <TextInput
            id="id"
            type="text"
            required
            shadow
            onChange={handleSearchId}
          />
        </div>

        <div>
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
            onClick={handleSearchUser}
          >
            Search
          </Button>
        </div>
      </div>

      <div className=" pt-14 ">
        <div>
          {user && (
            <form className="gap-4" onSubmit={handleSubmit}>
              {user && (
                <div className="mb-2 block">
                  <img
                    className="rounded-full ms-auto h-28 max-w-28"
                    src={imageUrl || user.profilePicture}
                  />
                </div>
              )}

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
                  defaultValue={user?.name || ""}
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
                  defaultValue={user?.id || ""}
                  onChange={handleTextboxDataChange}
                />
              </div>

              <div>
                <div className="mb-2 block">
                  <Label value=" Date of Birth" />
                </div>
                <div>
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
                  defaultValue={user?.email || ""}
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
                  defaultValue={user?.nic || ""}
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
                  defaultValue={user?.phoneNumber || ""}
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
                  defaultValue={user?.address || ""}
                  onChange={handleTextboxDataChange}
                />
              </div>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="pStation" value="Police Station" />
                </div>
                <Select
                  id="pStation"
                  required
                  onChange={handleTextboxDataChange}
                >
                  <option>
                    {user?.pStation || "Select the police station"}
                  </option>
                  <option value="Matara">Matara</option>
                  <option value="Galle">Galle</option>
                  <option value="Colombo">Colombo</option>
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
