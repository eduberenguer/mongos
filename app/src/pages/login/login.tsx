import { useContext, useState } from 'react';
import { AccountsContexts } from '../../context/context';
import { useNavigate } from 'react-router-dom';
import { accountState } from '../../store/actions.creators/accounts.action.creator';

interface LoginFields {
  email: string;
  password: string;
  role: string;
}

const initialValueLogin: LoginFields = {
  email: '',
  password: '',
  role: '',
};

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AccountsContexts);
  const [loginFields, setLoginFields] =
    useState<LoginFields>(initialValueLogin);

  const handleLoginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginFields({
      ...loginFields,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!loginFields.email || !loginFields.password || !loginFields.role) {
    } else {
      let data = {
        ...loginFields,
      };
      const result: accountState = await login(data);
      if (result.token) {
        navigate('/admin');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <input
          type="radio"
          name="role"
          value="shelter"
          checked={loginFields.role === 'shelter'}
          onChange={handleLoginChange}
        />{' '}
        Shelter
      </label>
      <label>
        <input
          type="radio"
          name="role"
          value="user"
          checked={loginFields.role === 'user'}
          onChange={handleLoginChange}
        />{' '}
        User
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={loginFields.email}
          onChange={handleLoginChange}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={loginFields.password}
          onChange={handleLoginChange}
        />
      </label>
      <button type="submit">Login</button>
    </form>
  );
}
