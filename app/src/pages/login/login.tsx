import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AccountsContexts } from '@/context/context';
import { accountState } from '@/store/actions.creators/accounts.action.creator';
import { toast } from 'sonner';

import style from './login.module.scss';
import genericStyles from '@/app/app.module.scss';

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
        toast.success('Login successful');
        navigate('/admin');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <p className={style.title}>Log in</p>
      <div className={style.user_type_container}>
        <label>
          {loginFields.role !== 'user' && loginFields.role !== 'shelter' && (
            <span>Choose an option:</span>
          )}
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
      </div>
      {loginFields.role !== '' && (
        <div className={style.inputs}>
          <input
            className={style.input}
            type="email"
            name="email"
            value={loginFields.email}
            onChange={handleLoginChange}
            placeholder="Email"
          />
          <input
            className={style.input}
            type="password"
            name="password"
            value={loginFields.password}
            onChange={handleLoginChange}
            placeholder="Password"
          />
          <button className={genericStyles.button} type="submit">
            Log in
          </button>
        </div>
      )}
    </form>
  );
}
