import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Header } from '../components/header/header';

const Home = lazy(() => import('../pages/home/home'));
const Register = lazy(() => import('../pages/register/register'));

export default function App() {
  return (
    <>
      <Suspense>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </Suspense>
    </>
  );
}
