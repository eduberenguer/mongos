import axios from 'axios';

export const handleImageUpload = async (
  // e: React.ChangeEvent<HTMLInputElement>
  file: any
) => {
  return new Promise<string | undefined>((resolve, reject) => {
    // const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'txedrnrp');

      axios
        .post(
          'https://api.cloudinary.com/v1_1/eduBerenguer/image/upload',
          formData
        )
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
