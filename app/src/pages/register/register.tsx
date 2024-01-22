import { useContext, useState } from 'react';
import { AccountsContexts } from '../../context/context';
import { handleImageUpload } from '../../services/files/files.cloudinary.repository';
import {
  ShelterFormFields,
  UserFormFields,
} from '../../components/register.form/types/types.form';
import {
  initialValueShelter,
  initialValueUser,
} from '../../components/register.form/initial.values/initial.values';

import style from './register.module.scss';
import genericStyles from '../../app/app.module.scss';
import { useNavigate } from 'react-router-dom';
import { UserForm } from '../../components/register.form/user.form/user.form';
import { ShelterForm } from '../../components/register.form/shelter.form/shelter.form';

export default function Register() {
  const navigate = useNavigate();
  const [loadingImage, setLoadingImage] = useState<boolean>(false);
  const { create } = useContext(AccountsContexts);
  const [role, setRole] = useState<'shelter' | 'user'>();
  const [shelterFields, setShelterFields] =
    useState<ShelterFormFields>(initialValueShelter);
  const [userFields, setUserFields] = useState<UserFormFields>(
    initialValueUser as UserFormFields
  );

  const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRole(event.target.value as 'shelter' | 'user');
    setShelterFields(initialValueShelter);
    setUserFields(initialValueUser as UserFormFields);
  };

  const handleShelterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShelterFields({
      ...shelterFields,
      [event.target.name]: event.target.value,
    });
  };

  const handleAddressChange = (address: string) => {
    setShelterFields({
      ...shelterFields,
      address,
    });
  };

  const ifFormValid = () => {
    if (role === 'shelter') {
      if (
        shelterFields.shelterName &&
        shelterFields.email &&
        shelterFields.password &&
        shelterFields.address &&
        shelterFields.avatar
      ) {
        return true;
      }
      return false;
    } else {
      if (
        userFields.userName &&
        userFields.email &&
        userFields.password &&
        userFields.address &&
        userFields.lifestyle.length &&
        userFields.avatar
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
        <ShelterForm
          handleShelterChange={handleShelterChange}
          shelterFields={shelterFields}
          handleImageUploadChange={handleImageUploadChange}
          loadingImage={loadingImage}
          handleAddressChange={handleAddressChange}
        />
      )}

      {role === 'user' && (
        <UserForm
          userFields={userFields}
          handleImageUploadChange={handleImageUploadChange}
          loadingImage={loadingImage}
          setUserFields={setUserFields}
          handleAddressChange={handleAddressChange}
        />
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
