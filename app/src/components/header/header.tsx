import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AccountsContexts } from '../../context/context';

export const Header = () => {
  const { logout, stateAccount } = useContext(AccountsContexts);

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <p>Logo</p>
      {stateAccount.accountLogged?.token === undefined ? (
        <div>
          <Link to={'/login'}>Login</Link>
          <Link to={'/register'}>Register</Link>
        </div>
      ) : (
        <button onClick={handleLogout}>Logout</button>
      )}
    </>
  );
};
