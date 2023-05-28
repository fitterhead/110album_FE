import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from "../app/config";
import axios from "axios";

export const cloudinaryupload = async (item, folder) => {
  if (!item) return "";

  try {
    const formData = new FormData();
    console.log("item", item);
    // formData.append("file", item);
    const originalFilename = item.name
      .toLowerCase()
      .replace(/[\d\s.]+mp3$/gi, "");
    console.log("originalFilename", originalFilename);
    formData.append("file", item);

    if (folder) {
      formData.append("folder", folder);
    }
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    formData.append("public_id", originalFilename);

    console.log("formdatainitial", formData);

    const response = await axios({
      url: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`,
      method: "POST",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // const imageUrl = response.data.secure_url;
    const mediaUrl = response.data;
    
    return mediaUrl;
  } catch (error) {
    throw error;
  }
};
