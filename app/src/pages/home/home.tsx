import { useContext, useEffect } from 'react';
import { DogsContexts } from '../../context/context';
import { Card } from '../../components/card/card';

export default function Home() {
  const { stateDogs, getDogs } = useContext(DogsContexts);

  useEffect(() => {
    getDogs();
  }, []);

  return (
    <div>
      <h1>Soy la home</h1>
      {stateDogs.dogs.map((dog) => (
        <Card {...dog} key={dog.chipNumber} />
      ))}
    </div>
  );
}
