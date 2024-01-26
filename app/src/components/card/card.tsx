import { Link } from 'react-router-dom';
import { Dog } from '../../models/dog.type';

import style from './card.module.scss';

export const Card = ({ dog }: { dog: Dog }) => {
  return (
    <div className={style.card}>
      <Link to={`/dog/details/${dog.id}`} className={style.link}>
        <img src={dog.image as string} alt={dog.name} />
      </Link>
      <div className={style.content}>
        <div className={style.left}>
          <p className={style.name}>{dog.name}</p>
          <p className={style.text}>{dog.shelter.shelterName}</p>
        </div>
        <div className={style.personality}>
          {dog.personality.map((personality) => (
            <p key={personality}>{personality}</p>
          ))}
        </div>
      </div>
    </div>
  );
};
