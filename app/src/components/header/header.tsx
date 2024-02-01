import { useContext, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AccountsContexts } from '../../context/context';
import { CiMenuBurger } from 'react-icons/ci';

import style from './header.module.scss';
import genericStyle from '../../app/app.module.scss';
import { Navbar } from './navbar/navbar';

export const Header = () => {
  const navigate = useNavigate();
  const { stateAccount, logout } = useContext(AccountsContexts);
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    setDropdown(false);
    navigate('/');
  };

  const closeDropdown = () => {
    setDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !(dropdownRef.current as HTMLElement).contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

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
        <div onClick={() => setDropdown(!dropdown)} ref={dropdownRef}>
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
