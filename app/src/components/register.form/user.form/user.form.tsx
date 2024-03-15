import { useEffect, useState } from 'react';
import { UserFormFields } from '../types/types.form';
import { optionsLifestyle } from '../form.options/lifestyle.options';
import { Lifestyle } from '@/models/user.type';
import { getProvinces } from '@/services/provinces/getProvinces';

import style from './user.form.module.scss';
import genericStyles from '@/app/app.module.scss';

export const UserForm = ({
  userFields,
  setUserFields,
}: {
  userFields: UserFormFields;
  setUserFields: any;
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

  const handleLifeStyleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.checked) {
      setUserFields({
        ...userFields,
        lifestyle: [...userFields.lifestyle, event.target.value],
      });
    } else {
      setUserFields({
        ...userFields,
        lifestyle: userFields.lifestyle.filter(
          (lifestyle) => lifestyle !== event.target.value
        ),
      });
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setUserFields({
        ...userFields,
        avatar: file,
      });
    }
  };

  return (
    <div className={style.container_user_form}>
      <input
        className={`${genericStyles.input} ${style.input}`}
        type="text"
        name="userName"
        value={userFields.userName}
        onChange={(e) => {
          setUserFields({ ...userFields, userName: e.target.value });
        }}
        placeholder="User name"
        required
      />
      <input
        className={`${genericStyles.input} ${style.input}`}
        type="text"
        name="address"
        value={userFields.address}
        onChange={(e) => {
          setUserFields({ ...userFields, address: e.target.value });
        }}
        placeholder="Address"
      />
      <select
        className={`${genericStyles.input} ${style.input}`}
        name="province"
        value={userFields.province}
        onChange={(e) => {
          setUserFields({
            ...userFields,
            province: e.target.value,
          });
        }}
        style={{ maxHeight: '120px', overflowY: 'auto' }}
        size={4}
      >
        {!userFields.province && <option value="">Select a province:</option>}
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
        value={userFields.email}
        onChange={(e) => {
          setUserFields({ ...userFields, email: e.target.value });
        }}
        placeholder="Email"
      />
      <input
        className={`${genericStyles.input} ${style.input}`}
        type="password"
        name="password"
        value={userFields.password}
        onChange={(e) => {
          setUserFields({ ...userFields, password: e.target.value });
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
      <div className={style.container_lifestyle}>
        <div className={style.lifestyles}>
          {optionsLifestyle.map((lifestyle: Lifestyle) => (
            <div key={lifestyle}>
              <input
                type="checkbox"
                name="lifestyle"
                value={lifestyle}
                onChange={handleLifeStyleChange}
                required
                disabled={
                  userFields.lifestyle.length === 3 &&
                  !userFields.lifestyle.includes(lifestyle)
                }
              />
              <label htmlFor="">{lifestyle}</label>
            </div>
          ))}
        </div>
      </div>
      {/* <input
        className={`${genericStyles.input} ${style.input}`}
        type="text"
        name="address"
        value={userFields.address}
        onChange={(e) => {
          setUserFields({ ...userFields, address: e.target.value });
        }}
        placeholder="Address"
      /> */}
    </div>
  );
};
