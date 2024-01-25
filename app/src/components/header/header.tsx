import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AccountsContexts } from '../../context/context';
import { CiMenuBurger } from 'react-icons/ci';

import style from './header.module.scss';
import genericStyle from '../../app/app.module.scss';
import { Navbar } from './navbar/navbar';

export const Header = () => {
  const { stateAccount, logout } = useContext(AccountsContexts);
  const [dropdown, setDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    setDropdown(false);
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
        <div onClick={() => setDropdown(!dropdown)}>
          {stateAccount.accountLogged?.token !== undefined && (
            <div className={style.menu}>
              <CiMenuBurger className={style.icon} />
              <img
                className={style.avatar}
                src={stateAccount.accountLogged?.user?.avatar as string}
                alt="avatar"
              />
            </div>
          )}
          {dropdown && <Navbar handleLogout={handleLogout} />}
        </div>
      )}
    </header>
  );
};
