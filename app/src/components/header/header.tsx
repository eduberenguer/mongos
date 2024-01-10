import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AccountsContexts } from '../../context/context';

import style from './header.module.scss';
import genericStyle from '../../app/app.module.scss';

export const Header = () => {
  const { logout, stateAccount } = useContext(AccountsContexts);

  const handleLogout = () => {
    logout();
  };

  return (
    <header className={style.header}>
      <Link to={'/'} className={style.link}>
        <p>Logo</p>
      </Link>
      {stateAccount.accountLogged?.token === undefined ? (
        <div className={style.container_options}>
          <Link to={'/login'} className={style.link}>
            <button className={genericStyle.button}>Login</button>
          </Link>
          <Link to={'/register'} className={style.link}>
            <button className={genericStyle.button}>Register</button>
          </Link>
        </div>
      ) : (
        <div className={style.container_options}>
          {stateAccount.accountLogged?.token !== undefined && (
            <img
              className={style.avatar}
              src={stateAccount.accountLogged?.user?.avatar}
              alt="avatar"
            />
          )}
          <span onClick={handleLogout}>
            <button className={genericStyle.button}>Logout</button>
          </span>
        </div>
      )}
    </header>
  );
};
