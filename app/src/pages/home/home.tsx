import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AccountsContexts, DogsContexts } from '../../context/context';
import { Card } from '../../components/card/card';

import style from './home.module.scss';
import genericStyle from '../../app/app.module.scss';
import { Dog } from '../../models/dog.type';

export default function Home() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [renderDogs, setRenderDogs] = useState<Dog[]>([]);
  const { getDogs, getDogsByShelter } = useContext(DogsContexts);
  const { stateAccount } = useContext(AccountsContexts);

  const handleClearFilters = async () => {
    const response = await getDogs();
    setRenderDogs(response);
    navigate('/');
  };

  const fetchData = async () => {
    const data = id ? await getDogsByShelter(id, false) : await getDogs();
    setRenderDogs(data);
  };

  useEffect(() => {
    fetchData();
  }, [id, stateAccount.accountLogged.user]);

  return (
    <>
      <div className={style.total_dogs}>
        {id && (
          <button className={genericStyle.button} onClick={handleClearFilters}>
            Total dogs
          </button>
        )}
      </div>
      <div className={style.container_card}>
        {renderDogs.map((dog) => (
          <Card key={dog.id} dog={dog} />
        ))}
        {!renderDogs.length && <h2>No registered dogs</h2>}
      </div>
    </>
  );
}
