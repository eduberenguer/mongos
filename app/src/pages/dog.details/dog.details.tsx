import { useEffect, useContext } from 'react';
import { DogsContexts } from '../../context/context';
import { Link, useParams } from 'react-router-dom';
import { SlMagnifierAdd } from 'react-icons/sl';

import style from './dog.details.module.scss';

export default function Details() {
  let { id } = useParams();
  const { stateDogs, getDogById } = useContext(DogsContexts);

  useEffect(() => {
    getDogById(String(id));
  }, []);

  const { dog } = stateDogs;

  return (
    <div className={style.dog_details}>
      {dog && (
        <>
          <div className={style.chrome}>
            <p className={style.name}>{dog.name}</p>
            <img src={dog.image as string} alt={dog.name} />
          </div>
          <div className={style.info}>
            <label>Edad:</label>
            <p>{`${dog.years} years and ${dog.months} months`}</p>
            <label>Gender:</label>
            <p>{dog.gender}</p>
            {dog.breed && (
              <>
                <label>Breed:</label>
                <p>{dog.breed}</p>
              </>
            )}
            <label>Size:</label>
            <p>{dog.size}</p>
            <label>Personality:</label>
            <div>
              {dog.personality.map((item) => {
                return <ul className={style.category}>{item}</ul>;
              })}
            </div>
            <label>Description:</label>
            <p className={style.description}>{dog.description}</p>
            <label>Shelter:</label>
            <Link
              to={`/shelter/details/${dog.shelter.id}`}
              className={style.link}
            >
              <p>
                {dog.shelter.shelterName} <SlMagnifierAdd />
              </p>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
