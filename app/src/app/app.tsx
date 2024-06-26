import { lazy, Suspense, useContext, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Header } from '../components/header/header';
import { AccountsContexts } from '../context/context';

const Home = lazy(() => import('@/pages/home/home'));
const Register = lazy(() => import('@/pages/register/register'));
const Login = lazy(() => import('@/pages/login/login'));
const Admin = lazy(() => import('@/pages/shelter.admin/shelter.admin'));
const DogDetails = lazy(() => import('@/pages/dog.details/dog.details'));
const ShelterDetails = lazy(
  () => import('@/pages/shelter.details/shelter.details')
);
const Favourites = lazy(() => import('@/pages/favourites/favourites'));
const Requests = lazy(() => import('@/pages/requests/requests'));

import './app.module.scss';
import { Toaster } from 'sonner';

export default function App() {
  const { stateAccount, loginWithToken } = useContext(AccountsContexts);

  useEffect(() => {
    loginWithToken();
  }, []);

  return (
    <>
      <Suspense>
        <Toaster position="top-center" richColors />
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/dogByShelter/:id" element={<Home />}>
            {' '}
          </Route>
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
          <Route
            path="/shelter/details/:id"
            element={<ShelterDetails />}
          ></Route>
          <Route path="/dog/details/:id" element={<DogDetails />}></Route>
          <Route
            path="/favourites"
            element={
              stateAccount.accountLogged?.user?.role !== 'user' ? (
                <Navigate to="/" />
              ) : (
                <Favourites />
              )
            }
          ></Route>
          <Route
            path="/requests"
            element={
              !stateAccount.accountLogged?.token ? (
                <Navigate to="/" />
              ) : (
                <Requests />
              )
            }
          ></Route>
          <Route path="*" element={<Navigate to="/" />}></Route>
        </Routes>
      </Suspense>
    </>
  );
}
