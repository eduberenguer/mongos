import { Suspense } from 'react';
import { Routes } from 'react-router-dom';

export default function App() {
  return (
    <>
      <Suspense>
        <Routes>
          <p>TEST</p>
        </Routes>
      </Suspense>
    </>
  );
}
