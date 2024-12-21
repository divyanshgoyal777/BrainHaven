import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
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
    }
  };

  return (
    <div className="image-upload flex items-center justify-center">
        <form onSubmit={handleSubmit} className="flex flex-col items-center w-fit m-auto">
          <input type="file" name="image" onChange={handleImageChange} className="w-max m-auto"/>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Upload
          </button>
        </form>
    </div>
  );
};

export default ImageUpload;
