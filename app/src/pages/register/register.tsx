import { useContext, useState } from 'react';
import { AccountsContexts } from '../../context/context';
import { handleImageUpload } from '../../services/files.cloudinary.repository';

import style from './register.module.scss';
import genericStyles from '../../app/app.module.scss';
import { useNavigate } from 'react-router-dom';

interface ShelterFormFields {
  shelterName: string;
  email: string;
  password: string;
  address: string;
  registerDate: Date;
  avatar: File | undefined | string | null;
  role: string;
}

interface UserFormFields {
  userName: string;
  email: string;
  password: string;
  address: string;
  avatar: File | undefined | string | null;
  favourites: string[];
  registerDate: Date;
  friends: string[];
  lifestyle: string[];
  role: string;
}

const initialValueShelter = {
  shelterName: '',
  email: '',
  password: '',
  address: '',
  registerDate: new Date(),
  avatar: null,
  role: 'shelter',
};

const initialValueUser = {
  userName: '',
  email: '',
  password: '',
  address: '',
  avatar: null,
  favourites: [],
  registerDate: new Date(),
  friends: [],
  lifestyle: [],
  role: 'user',
};

export default function Register() {
  const navigate = useNavigate();
  const [loadingImage, setLoadingImage] = useState<boolean>(false);
  const { create } = useContext(AccountsContexts);
  const [role, setRole] = useState<'shelter' | 'user'>();
  const [shelterFields, setShelterFields] =
    useState<ShelterFormFields>(initialValueShelter);
  const [userFields, setUserFields] =
    useState<UserFormFields>(initialValueUser);

  const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRole(event.target.value as 'shelter' | 'user');
    setShelterFields(initialValueShelter);
    setUserFields(initialValueUser);
  };

  const handleShelterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShelterFields({
      ...shelterFields,
      [event.target.name]: event.target.value,
    });
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserFields({ ...userFields, [event.target.name]: event.target.value });
  };

  const ifFormValid = () => {
    if (role === 'shelter') {
      if (
        shelterFields.shelterName &&
        shelterFields.email &&
        shelterFields.password &&
        shelterFields.address
      ) {
        return true;
      }
      return false;
    } else {
      if (
        userFields.userName &&
        userFields.email &&
        userFields.password &&
        userFields.address
      ) {
        return true;
      }
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let data = {};

    if (!ifFormValid()) {
      return;
    }

    if (role === 'shelter') {
      data = {
        ...shelterFields,
        registerDate: new Date(),
      };
    } else {
      data = {
        ...userFields,
        registerDate: new Date(),
      };
    }
    create(data);
    navigate('/login');
  };

  const handleImageUploadChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLoadingImage(!loadingImage);
    const imageUrl = await handleImageUpload(e);
    if (imageUrl) setLoadingImage(false);
    if (role === 'shelter') {
      setShelterFields((prevState) => ({
        ...prevState,
        avatar: imageUrl || '',
      }));
    } else {
      setUserFields((prevState) => ({
        ...prevState,
        avatar: imageUrl || '',
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <p className={style.title}>Register</p>
      <div className={style.user_type_container}>
        <label>
          {role !== 'user' && role !== 'shelter' && (
            <span>Choose an option:</span>
          )}
          <input
            type="radio"
            name="role"
            value="shelter"
            checked={role === 'shelter'}
            onChange={handleRoleChange}
          />{' '}
          Shelter
        </label>
        <label>
          <input
            type="radio"
            name="role"
            value="user"
            checked={role === 'user'}
            onChange={handleRoleChange}
          />{' '}
          User
        </label>
      </div>
      {role === 'shelter' && (
        <>
          <input
            className={genericStyles.input}
            type="text"
            name="shelterName"
            value={shelterFields.shelterName}
            onChange={handleShelterChange}
            placeholder="Shelter name"
          />
          <input
            className={genericStyles.input}
            type="email"
            name="email"
            value={shelterFields.email}
            onChange={handleShelterChange}
            placeholder="Email"
          />
          <input
            className={genericStyles.input}
            type="password"
            name="password"
            value={shelterFields.password}
            onChange={handleShelterChange}
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
                src={shelterFields.avatar as unknown as string}
                alt={shelterFields.shelterName}
              />
            )}
          </div>
          {/* <input
            type="file"
            accept="image/*"
            name="avatar"
            onChange={(e) =>
              setShelterFields({
                ...shelterFields,
                avatar:
                  e.target.files && e.target.files[0]
                    ? e.target.files[0]
                    : undefined,
              })
            }
            required
          /> */}
          <input
            className={genericStyles.input}
            type="text"
            name="address"
            value={shelterFields.address}
            onChange={handleShelterChange}
            placeholder="Address"
          />
        </>
      )}

      {role === 'user' && (
        <>
          <input
            className={genericStyles.input}
            type="text"
            name="userName"
            value={userFields.userName}
            onChange={handleUserChange}
            placeholder="User name"
          />
          <input
            className={genericStyles.input}
            type="email"
            name="email"
            value={userFields.email}
            onChange={handleUserChange}
            placeholder="Email"
          />
          <input
            className={genericStyles.input}
            type="password"
            name="password"
            value={userFields.password}
            onChange={handleUserChange}
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
          {/* <input
            type="file"
            accept="image/*"
            name="avatar"
            onChange={(e) =>
              setUserFields({
                ...userFields,
                avatar:
                  e.target.files && e.target.files[0]
                    ? e.target.files[0]
                    : undefined,
              })
            }
            required
          /> */}
          <input
            className={genericStyles.input}
            type="text"
            name="address"
            value={userFields.address}
            onChange={handleUserChange}
            placeholder="Address"
          />
        </>
      )}
      <button
        className={`${
          ifFormValid() ? genericStyles.button : genericStyles.button_disabled
        }`}
        type="submit"
      >
        Register
      </button>
    </form>
  );
}
