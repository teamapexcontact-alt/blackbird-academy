import { v2 as cloudinary } from "cloudinary";

function lazyProxy<T extends object>(factory: () => T): T {
  let instance: T | null = null;
  return new Proxy({} as T, {
    get(_, prop) {
      if (!instance) {
        if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
          throw new Error("Cloudinary environment variables are not set");
        }
        instance = factory();
      }
      return (instance as any)[prop];
    },
  });
}

export const cloudinaryV2 = lazyProxy(() => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  return cloudinary;
});
