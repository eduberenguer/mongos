import { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DogsContexts } from '../../context/context';
import { Card } from '../../components/card/card';

import style from './home.module.scss';
import genericStyle from '../../app/app.module.scss';

export default function Home() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { stateDogs, getDogs, getDogsByShelter } = useContext(DogsContexts);

  useEffect(() => {
    if (id) {
      getDogsByShelter(id, false);
    } else {
      getDogs();
    }
  }, []);

  const handleTotal = () => {
    getDogs();
    navigate('/');
  };

  return (
    <>
      <div className={style.total_dogs}>
        {id && (
          <button className={genericStyle.button} onClick={handleTotal}>
            Total dogs
          </button>
        )}
      </div>
      <div className={style.container_card}>
        {stateDogs.dogs.length ? (
          stateDogs.dogs.map((dog) => <Card {...dog} key={dog.chipNumber} />)
        ) : (
          <p>No register dogs</p>
        )}
      </div>
    </>
  );
}
