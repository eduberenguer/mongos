import { UserFormFields } from '../types/types.form';
import { optionsLifestyle } from '../form.options/lifestyle.options';

import style from './user.form.module.scss';
import genericStyles from '../../../app/app.module.scss';
import { Lifestyle } from '../../../models/user.type';

export const UserForm = ({
  userFields,
  handleImageUploadChange,
  loadingImage,
  setUserFields,
}: {
  userFields: UserFormFields;
  handleImageUploadChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  loadingImage: boolean;
  setUserFields: any;
}) => {
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
          type="file"
          accept="image/*"
          name="image"
          onChange={handleImageUploadChange}
        />
        {loadingImage ? (
          <p className={style.textImage}>Loading image</p>
        ) : (
          <img
            className={style.loadingImage}
            src={userFields.avatar as unknown as string}
            alt={userFields.userName}
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
    </div>
  );
};
