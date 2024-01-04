import { useContext, useState } from 'react';
import { AccountsContexts } from '../../context/context';

interface ShelterFormFields {
  shelterName: string;
  email: string;
  password: string;
  address: string;
  registerDate: Date;
  avatar: string;
  role: string;
}

interface UserFormFields {
  userName: string;
  email: string;
  password: string;
  address: string;
  avatar: string;
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
  avatar: '',
  role: 'shelter',
};

const initialValueUser = {
  userName: '',
  email: '',
  password: '',
  address: '',
  avatar: '',
  favourites: [],
  registerDate: new Date(),
  friends: [],
  lifestyle: [],
  role: 'user',
};

export default function Register() {
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let data = {};

    if (role === 'shelter') {
      data = {
        ...shelterFields,
        registerDate: new Date(),
        avatar: 'image shelter',
      };
    } else {
      data = {
        ...userFields,
        registerDate: new Date(),
        avatar: 'image shelter',
      };
    }
    create(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
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

      {role === 'shelter' && (
        <>
          <input
            type="text"
            name="shelterName"
            value={shelterFields.shelterName}
            onChange={handleShelterChange}
            placeholder="Shelter name"
          />
          <input
            type="email"
            name="email"
            value={shelterFields.email}
            onChange={handleShelterChange}
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            value={shelterFields.password}
            onChange={handleShelterChange}
            placeholder="Password"
          />
          <input
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
            type="text"
            name="userName"
            value={userFields.userName}
            onChange={handleUserChange}
            placeholder="User name"
          />
          <input
            type="email"
            name="email"
            value={userFields.email}
            onChange={handleUserChange}
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            value={userFields.password}
            onChange={handleUserChange}
            placeholder="Password"
          />
          <input
            type="text"
            name="address"
            value={userFields.address}
            onChange={handleUserChange}
            placeholder="Address"
          />
        </>
      )}
      <button type="submit">Registrarse</button>
    </form>
  );
}
