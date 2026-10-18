
import { Readable } from "node:stream";
import cloudinary from "./cloudinary.js";

const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "writora/blog-covers",
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }

        resolve(result);
      }
    );

    Readable.from([fileBuffer]).pipe(uploadStream);
  });
};

export default uploadToCloudinary;
