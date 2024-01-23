import { UserFormFields } from '../types/types.form';
import { optionsLifestyle } from '../form.options/lifestyle.options';
import Autocomplete from '../../google.maps/autocomplete/react-google-maps-api-autocomplete';

import style from './user.form.module.scss';
import genericStyles from '../../../app/app.module.scss';
import { Lifestyle } from '../../../models/user.type';
import { useEffect, useState } from 'react';

export const UserForm = ({
  userFields,
  setUserFields,
  // handleImageUploadChange,
  handleAddressChange,
}: {
  userFields: UserFormFields;
  setUserFields: any;
  // handleImageUploadChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddressChange: any;
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [provinces, setProvinces] = useState<[]>([]);

  useEffect(() => {
    const allProvinces = fetch(
      'https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/provincias-espanolas/records?select=provincia&group_by=provincia'
    );
    allProvinces
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setProvinces(data.results);
      });
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
      {/* <Autocomplete handleAddressChange={handleAddressChange} /> */}
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
        size={5}
      >
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
