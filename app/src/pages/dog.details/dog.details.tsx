import { useEffect, useContext, useState } from 'react';
import { AccountsContexts, DogsContexts } from '../../context/context';
import { Link, useParams } from 'react-router-dom';
import { SlMagnifierAdd } from 'react-icons/sl';
import { VscHeart } from 'react-icons/vsc';
import { ImHeart } from 'react-icons/im';

import style from './dog.details.module.scss';
import { User } from '../../models/user.type';
import { toast } from 'sonner';

export default function Details() {
  let { id } = useParams();
  const { stateDogs, getDogById, addNewViewDog } = useContext(DogsContexts);
  const { updateDogToFavourite, stateAccount } = useContext(AccountsContexts);
  const [isFavourite, setIsFavourite] = useState<boolean>();

  const checkDogIsFavourite = async (id: string) => {
    const dogFavourite = (
      stateAccount.accountLogged.user as User
    )?.favourites.includes(id);
    setIsFavourite(dogFavourite);

    return dogFavourite;
  };

  const handleFavourite = async () => {
    await updateDogToFavourite(
      id as string,
      stateAccount.accountLogged.user?.id as string
    );
    setIsFavourite(!isFavourite);
    isFavourite
      ? toast.info('Dog removed from favourites')
      : toast.success('Dog added to favourites');
  };

  useEffect(() => {
    checkDogIsFavourite(id as string);
    getDogById(String(id));
    addNewViewDog(String(id));
  }, []);

  const { dog } = stateDogs;

  return (
    <div className={style.dog_details}>
      {dog && (
        <>
          <div className={style.chrome}>
            <p className={style.name}>{dog.name}</p>
            <div className={style.image_container}>
              <img src={dog.image as string} alt={dog.name} />
              {stateAccount.accountLogged.user?.role === 'user' && (
                <span
                  onClick={handleFavourite}
                  className={style.icon_favourite}
                >
                  {isFavourite ? <ImHeart /> : <VscHeart />}
                </span>
              )}
            </div>
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
                return (
                  <ul className={style.category} key={item}>
                    {item}
                  </ul>
                );
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
