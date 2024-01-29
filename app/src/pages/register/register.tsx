import { useContext, useState } from 'react';
import { AccountsContexts } from '../../context/context';
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
import { isFormRegisterValid } from './validate/isFormRegisterValid';
import { toast } from 'sonner';

export default function Register() {
  const navigate = useNavigate();
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isFormRegisterValid(role, shelterFields, userFields)) {
      return;
    }

    const data = {
      ...(role === 'shelter' ? shelterFields : userFields),
      registerDate: new Date(),
    };

    create(data);
    toast.success('Register successful');
    navigate('/login');
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
          shelterFields={shelterFields}
          setShelterFields={setShelterFields}
        />
      )}

      {role === 'user' && (
        <UserForm userFields={userFields} setUserFields={setUserFields} />
      )}
      <button
        className={`${
          isFormRegisterValid(role, shelterFields, userFields)
            ? genericStyles.button
            : genericStyles.button_disabled
        }`}
        type="submit"
      >
        Register
      </button>
    </form>
  );
}
