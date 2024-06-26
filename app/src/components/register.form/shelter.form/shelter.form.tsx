import { useEffect, useState } from 'react';
import { ShelterFormFields } from '../types/types.form';
import style from './shelter.form.module.scss';
import genericStyles from '@/app/app.module.scss';
import { getProvinces } from '@/services/provinces/getProvinces';

export const ShelterForm = ({
  shelterFields,
  setShelterFields,
}: {
  shelterFields: ShelterFormFields;
  setShelterFields: any;
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [provinces, setProvinces] = useState<[]>([]);

  useEffect(() => {
    const retriever = async () => {
      const result = await getProvinces();
      setProvinces(result.results);
    };

    retriever();
  }, []);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setShelterFields({
        ...shelterFields,
        avatar: file,
      });
    }
  };

  return (
    <div className={style.container_shelter_form}>
      <input
        className={`${genericStyles.input} ${style.input}`}
        type="text"
        name="shelterName"
        value={shelterFields.shelterName}
        onChange={(e) => {
          setShelterFields({
            ...shelterFields,
            shelterName: e.target.value,
          });
        }}
        placeholder="Shelter name"
      />
      <input
        className={`${genericStyles.input} ${style.input}`}
        type="text"
        name="address"
        value={shelterFields.address}
        onChange={(e) => {
          setShelterFields({
            ...shelterFields,
            address: e.target.value,
          });
        }}
        placeholder="Address"
      />
      <select
        className={`${genericStyles.input} ${style.input}`}
        name="province"
        value={shelterFields.province}
        onChange={(e) => {
          setShelterFields({
            ...shelterFields,
            province: e.target.value,
          });
        }}
        style={{ maxHeight: '120px', overflowY: 'auto' }}
        size={4}
      >
        {!shelterFields.province && (
          <option value="">Select a province:</option>
        )}
        {provinces &&
          provinces.map((province: any) => {
            return (
              <option key={province.provincia} value={province.provincia}>
                {province.provincia}
              </option>
            );
          })}
      </select>
      <input
        className={`${genericStyles.input} ${style.input}`}
        type="email"
        name="email"
        value={shelterFields.email}
        onChange={(e) => {
          setShelterFields({ ...shelterFields, email: e.target.value });
        }}
        placeholder="Email"
      />
      <input
        className={`${genericStyles.input} ${style.input}`}
        type="password"
        name="password"
        value={shelterFields.password}
        onChange={(e) => {
          setShelterFields({ ...shelterFields, password: e.target.value });
        }}
        placeholder="Password"
      />
      <div className={style.loadImage}>
        <input
          className={`${genericStyles.input} ${style.input}`}
          type="file"
          accept="image/*"
          name="avatar"
          onChange={handleImageChange}
        />
        {imagePreview && (
          <img
            className={style.loadingImage}
            src={imagePreview}
            alt="Preview1"
          />
        )}
      </div>
    </div>
  );
};
