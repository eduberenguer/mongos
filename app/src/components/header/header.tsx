import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AccountsContexts } from '../../context/context';

import style from './header.module.scss';
import genericStyle from '../../app/app.module.scss';

export const Header = () => {
  let location = useLocation();
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
              src={stateAccount.accountLogged?.user?.avatar as string}
              alt="avatar"
            />
          )}
          {stateAccount.accountLogged?.user?.role === 'shelter' &&
            location.pathname !== '/admin' && (
              <Link to={'/admin'} className={style.link}>
                <button className={genericStyle.button}>Admin</button>
              </Link>
            )}
          <span onClick={handleLogout}>
            <button className={genericStyle.button}>Logout</button>
          </span>
        </div>
      )}
    </header>
  );
};
