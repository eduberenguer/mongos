import axios from 'axios';
import { cloudinaryUrl, cloudinaryPreset } from '@/config';

export const handleImageUpload = async (
  // e: React.ChangeEvent<HTMLInputElement>
  file: File
) => {
  return new Promise<string | undefined>((resolve, reject) => {
    // const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', cloudinaryPreset as string);

      axios
        .post(cloudinaryUrl as string, formData)
        .then((response) => {
          resolve(response.data.secure_url);
        })
        .catch((error) => {
          reject(error);
        });
    } else {
      resolve(undefined);
    }
  });
};
