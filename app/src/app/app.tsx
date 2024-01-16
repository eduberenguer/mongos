import { lazy, Suspense, useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Header } from '../components/header/header';
import { AccountsContexts } from '../context/context';

const Home = lazy(() => import('../pages/home/home'));
const Register = lazy(() => import('../pages/register/register'));
const Login = lazy(() => import('../pages/login/login'));
const Admin = lazy(() => import('../pages/admin/admin'));

import './app.module.scss';

export default function App() {
  const { stateAccount } = useContext(AccountsContexts);

  return (
    <>
      <Suspense>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/admin"
            element={
              stateAccount.accountLogged?.user?.role !== 'shelter' ? (
                <Navigate to="/" />
              ) : (
                <Admin />
              )
            }
          ></Route>
          <Route
            path="/register"
            element={
              stateAccount.accountLogged?.token ? (
                <Navigate to="/" />
              ) : (
                <Register />
              )
            }
          ></Route>
          <Route
            path="/login"
            element={
              stateAccount.accountLogged?.token ? (
                <Navigate to="/" />
              ) : (
                <Login />
              )
            }
          ></Route>
        </Routes>
      </Suspense>
    </>
  );
}
