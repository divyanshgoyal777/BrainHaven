import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImageName(file.name);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!image) {
      console.error("No image selected!");
      toast.error("No image selected!");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      setIsUploading(true);
      const response = await axios.post(
        "http://localhost:3000/api/user/upload",
        formData,
        {
          headers: {
            email: localStorage.getItem("email"),
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Response from server:", response.data);
      setImageUrl(response.data.url);
      toast.success("Image uploaded successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Error uploading image!");
    } finally {
      setIsUploading(false); 
    }
  };

  return (
    <div className="image-upload flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-fit m-auto mt-2"
      >
        <div className="flex flex-col items-center space-y-4">
          <label
            htmlFor="image"
            className="cursor-pointer bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition duration-300"
          >
            Choose Image
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              id="image"
              className="hidden"
            />
          </label>
          {imageName && (
            <div className="text-sm text-gray-400">
              <span>Selected Image: </span>
              <span className="font-semibold">{imageName}</span>
            </div>
          )}
          {imageName && (
            <button
              type="submit"
              className={`${
                isUploading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-700"
              } text-white font-bold py-2 px-6 rounded-lg shadow-lg transition duration-300 transform hover:scale-105`}
              disabled={isUploading} 
            >
              {isUploading ? "Uploading..." : "Upload"}{" "}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ImageUpload;
