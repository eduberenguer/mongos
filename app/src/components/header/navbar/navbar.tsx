import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AccountsContexts } from '../../../context/context';

import style from './navbar.module.scss';

export const Navbar = ({ handleLogout }: { handleLogout: () => void }) => {
  const location = useLocation();
  const { stateAccount } = useContext(AccountsContexts);

  return (
    <nav className={style.navbar}>
      <ul className="menus">
        {stateAccount.accountLogged?.user?.role === 'shelter' &&
          location.pathname !== '/admin' && (
            <Link to={'/admin'} className={style.link}>
              <li>
                <p>Admin</p>
              </li>
            </Link>
          )}
        {location.pathname !== '/requests' && (
          <Link to={'/requests'} className={style.link}>
            <li>
              <p>Requests</p>
            </li>
          </Link>
        )}
        {stateAccount.accountLogged?.user?.role === 'user' &&
          location.pathname !== '/favourites' && (
            <Link to={'/favourites'} className={style.link}>
              <li>
                <p>Favourites</p>
              </li>
            </Link>
          )}
        <li>
          <p onClick={handleLogout}>Logout</p>
        </li>
      </ul>
    </nav>
  );
};
