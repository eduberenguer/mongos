import { useEffect, useContext } from 'react';
import { AccountsContexts } from '../../context/context';
import { Link, useParams } from 'react-router-dom';

import style from './shelter.details.module.scss';

export default function Details() {
  let { id } = useParams();
  const { getShelterById, stateAccount } = useContext(AccountsContexts);

  useEffect(() => {
    getShelterById(String(id));
  }, []);

  const { shelter } = stateAccount;

  return (
    <>
      {shelter && (
        <div className={style.shelter_details}>
          <div className={style.chrome}>
            <p>{shelter.shelterName}</p>
            <img src={shelter.avatar as string} alt={shelter.shelterName} />
          </div>
          <div className={style.info}>
            <label>Email:</label>
            <p>{shelter.email}</p>
            <label>Address:</label>
            <p>{shelter.address}</p>
          </div>
          <Link to={`/dogByShelter/${shelter.id}`}>
            <button>{`See ${shelter.shelterName} dogs`}</button>
          </Link>
        </div>
      )}
    </>
  );
}
