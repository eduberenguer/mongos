import { useContext, useEffect } from 'react';
import { DogsContexts } from '../../context/context';
import { Card } from '../../components/card/card';

import style from './home.module.scss';

export default function Home() {
  const { stateDogs, getDogs } = useContext(DogsContexts);

  useEffect(() => {
    getDogs();
  }, []);

  return (
    <div className={style.container_card}>
      {stateDogs.dogs.length ? (
        stateDogs.dogs.map((dog) => <Card {...dog} key={dog.chipNumber} />)
      ) : (
        <p>No register dogs</p>
      )}
    </div>
  );
}
