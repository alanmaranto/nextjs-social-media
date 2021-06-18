import axios from "axios";

const uploadPic = async (media) => {
  try {
    const form = new FormData();
    form.append("file", media);
    form.append("upload_preset", "social_media");
    form.append("cloud_name", "alanmaranto");
    const response = await axios.post(process.env.CLOUDINARY_URL, form);
    return response.data.url;
  } catch (error) {}
};

export default uploadPic;
