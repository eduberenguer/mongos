import { useEffect, useContext } from 'react';
import { AccountsContexts } from '../../context/context';
import { Link, useParams } from 'react-router-dom';
import Map from '../../components/google.maps/maps/maps';

import style from './shelter.details.module.scss';
import genericStyles from '../../app/app.module.scss';

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
            <h1>{shelter.shelterName}</h1>
            <img src={shelter.avatar as string} alt={shelter.shelterName} />
          </div>
          <div className={style.info}>
            <Link to={`/dogByShelter/${shelter.id}`} className={style.link}>
              <button
                className={genericStyles.button}
              >{`See ${shelter.shelterName} dogs`}</button>
            </Link>
            <label>Email:</label>
            <p>{shelter.email}</p>
            <label>Address:</label>
            <p>{shelter.address}</p>
            <Map address={shelter.address} province={shelter.province} />
          </div>
        </div>
      )}
    </>
  );
}
