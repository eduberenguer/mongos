import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AccountsContexts } from '../../../context/context';

import style from './navbar.module.scss';

export const Navbar = ({ handleLogout }: { handleLogout: () => void }) => {
  let location = useLocation();
  const { stateAccount } = useContext(AccountsContexts);

  return (
    <nav className={style.navbar}>
      <ul className="menus">
        {stateAccount.accountLogged?.user?.role === 'shelter' &&
          location.pathname !== '/admin' && (
            <li>
              <Link to={'/admin'} className={style.link}>
                <p>Admin</p>
              </Link>
            </li>
          )}
        <li>
          <p onClick={handleLogout}>Logout</p>
        </li>
      </ul>
    </nav>
  );
};
