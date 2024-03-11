import { useEffect, useContext, useState } from 'react';
import {
  AccountsContexts,
  AdoptionRequestsContexts,
  DogsContexts,
} from '../../context/context';
import { User } from '../../models/user.type';
import { Link, useParams } from 'react-router-dom';

import style from './dog.details.module.scss';
import {
  HeartIcon,
  InformationCircleIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';

import {
  HeartIcon as HeartIconSolid,
  InformationCircleIcon as InformationCircleIconSolid,
} from '@heroicons/react/24/solid';

import { toast } from 'sonner';
import AdoptionRequestForm from '../../components/adoption.request.form/adoption.request.form';

export default function Details() {
  let { id: dogId } = useParams();
  const { stateDogs, getDogById, addNewViewDog } = useContext(DogsContexts);
  const { updateDogToFavourite, stateAccount } = useContext(AccountsContexts);
  const { checkDogIsAdoptionRequest } = useContext(AdoptionRequestsContexts);
  const [showAdoptionRequestForm, setShowAdoptionRequestForm] =
    useState<boolean>(false);

  const [isFavourite, setIsFavourite] = useState<boolean>();
  const [isAdoptionRequest, setIsAdoptionRequest] = useState<boolean>();

  const checkDogIsFavourite = async (dogId: string) => {
    const dogFavourite = (
      stateAccount.accountLogged.user as User
    )?.favourites?.includes(dogId);
    setIsFavourite(dogFavourite);

    return dogFavourite;
  };

  const checkDogIsAdoptionRequestByUser = async () => {
    if (stateAccount.accountLogged.user) {
      const result = await checkDogIsAdoptionRequest(
        dogId as string,
        stateAccount.accountLogged.user?.id as string
      );

      result && setIsAdoptionRequest(true);
      return true;
    }

    return false;
  };

  const handleFavourite = async () => {
    await updateDogToFavourite(
      dogId as string,
      stateAccount.accountLogged.user?.id as string
    );
    setIsFavourite(!isFavourite);
    isFavourite
      ? toast.info('Dog removed from favourites')
      : toast.success('Dog added to favourites');
  };

  const handleAdoptionRequest = async () => {
    if (isAdoptionRequest) {
      toast.info('You have already requested this dog');
      return;
    } else {
      setShowAdoptionRequestForm(!showAdoptionRequestForm);
    }
  };

  useEffect(() => {
    checkDogIsFavourite(dogId as string);
    checkDogIsAdoptionRequestByUser();
    getDogById(String(dogId));
    addNewViewDog(String(dogId));
  }, []);

  const { dog } = stateDogs;

  return (
    <div className={style.dog_details}>
      {dog && (
        <>
          <div
            className={`${style.chrome} ${
              showAdoptionRequestForm && style.dog_details_hidden
            }`}
          >
            <p className={style.name}>{dog.name}</p>
            <div className={style.image_container}>
              <img src={dog.image as string} alt={dog.name} />
              {dog.adoptedBy && <div className={style.adopted}>ADOPTED</div>}
              {stateAccount.accountLogged.user?.role === 'user' &&
                !dog.adoptedBy && (
                  <span
                    onClick={handleFavourite}
                    className={style.icon_favourite}
                  >
                    {isFavourite ? <HeartIconSolid /> : <HeartIcon />}
                  </span>
                )}
              {stateAccount.accountLogged.user?.role === 'user' &&
                !dog.adoptedBy && (
                  <span>
                    {isAdoptionRequest ? (
                      <InformationCircleIconSolid
                        className={style.icon_request}
                        onClick={handleAdoptionRequest}
                      />
                    ) : (
                      <InformationCircleIcon
                        className={style.icon_request}
                        onClick={handleAdoptionRequest}
                      />
                    )}
                  </span>
                )}
            </div>
          </div>
          <div
            className={`${style.info} ${
              showAdoptionRequestForm && style.dog_details_hidden
            }`}
          >
            <label>Age:</label>
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
                {dog.shelter.shelterName}{' '}
                <MagnifyingGlassIcon className={style.icon} />
              </p>
            </Link>
          </div>
        </>
      )}
      {showAdoptionRequestForm && dog && (
        <AdoptionRequestForm
          infoDog={dog}
          setShowAdoptionRequestForm={setShowAdoptionRequestForm}
          checkDogIsAdoptionRequestByUser={checkDogIsAdoptionRequestByUser}
        />
      )}
    </div>
  );
}
