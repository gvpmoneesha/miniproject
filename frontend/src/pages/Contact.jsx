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

export const Contact = () => {
  const [formData, setFormData] = useState({});

  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(0);
  const [imageUploadError, setImageUploadError] = useState(null);

  const navigate = useNavigate();

  console.log(formData);

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

  return (
    <div className="  max-w-lg p-3 mx-auto">
      <div>
        <div className="text-center text-teal-700 ">
          <h2 className=" font-bold text-3xl sm:text-5xl pt-10">Complain</h2>
        </div>
      </div>

      <div className=" pt-14 ">
        <div>
          <form className="gap-4 " onSubmit={handleSubmit}>
            <div>
              <div className="mb-2 block">
                <Label
                  value="
                     Name"
                />
              </div>
              <TextInput
                id="name"
                type="text"
                placeholder="moneesha kavindi"
                required
                shadow
                onChange={handleTextboxDataChange}
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label
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
                <label
                  for="message"
                  class="block mb-4 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Complain
                </label>
              </div>

              <textarea
                id="complain"
                rows="5"
                class="block mb-4 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="complain..."
                onChange={handleTextboxDataChange}
              ></textarea>
            </div>

            <div>
              <div className="mb-2 block">
                <Label value="Image" />
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
                  Submit
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
