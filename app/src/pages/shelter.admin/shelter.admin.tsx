import { useContext, useEffect, useState } from 'react';
import { AccountsContexts, DogsContexts } from '../../context/context';
import DogForm from '../../components/dog.form/dog.form';
import { Dog } from '../../models/dog.type';
import { transformDate } from '../../utils/transformDate';
import { toast } from 'sonner';

import style from './shelter.admin.module.scss';
import genericStyles from '../../app/app.module.scss';
import {
  PencilSquareIcon,
  ArchiveBoxArrowDownIcon,
  TrashIcon,
  ArchiveBoxXMarkIcon,
} from '@heroicons/react/24/outline';
import { ArchiveBoxIcon, ArrowLeftIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

export default function Admin() {
  const {
    getDogsByShelter,
    stateDogs,
    addDog,
    updateDog,
    deleteDog,
    loading,
    getDogs,
  } = useContext(DogsContexts);
  const { stateAccount } = useContext(AccountsContexts);
  const [showFormNewDog, setShowFormNewDog] = useState(false);
  const [showArchivedDogs, setshowArchivedDogs] = useState<boolean>(false);
  const [dataUpdateDog, setDataUpdateDog] = useState({} as Partial<Dog>);

  const thTable = [
    'Image',
    'Name',
    'Gender',
    'Size',
    'Years',
    'Months',
    'Chip Number',
    'Has Breed',
    'Has Adopted',
    'Registered',
    'Views',
    'Requests',
    'Actions',
  ];

  const handleGetDogsByShelter = async () => {
    getDogsByShelter(
      stateAccount.accountLogged.user?.id as string,
      showArchivedDogs
    );
  };

  useEffect(() => {
    handleGetDogsByShelter();
  }, [showArchivedDogs]);

  const handleUpdateRegisteredDog = async (dogId: string) => {
    await updateDog(
      dogId,
      {
        archived: !stateDogs.shelterDogs.find((dog) => dog.id === dogId)
          ?.archived,
      },
      stateAccount.accountLogged.token as string
    );
    await getDogsByShelter(
      stateAccount.accountLogged.user?.id as string,
      showArchivedDogs
    );
  };

  const handlerFormDog = () => {
    setShowFormNewDog(!showFormNewDog);
    setDataUpdateDog({});
  };

  const handleAddDog = async (
    e: React.FormEvent<HTMLFormElement>,
    dog: Partial<Dog>
  ) => {
    e.preventDefault();
    await addDog(dog, stateAccount.accountLogged.token as string);
    handlerFormDog();
    setshowArchivedDogs(true);
    await handleGetDogsByShelter();
    toast.success('Dog added');
    getDogs();
  };

  const handleRetrieveDataDog = async (dog: Partial<Dog>) => {
    setShowFormNewDog(true);
    setDataUpdateDog(dog);
  };

  const handleUpdateDog = async (
    e: React.FormEvent<HTMLFormElement>,
    dog: Partial<Dog>
  ) => {
    e.preventDefault();
    await updateDog(
      dataUpdateDog.id as string,
      dog,
      stateAccount.accountLogged.token as string
    );
    handlerFormDog();
    await handleGetDogsByShelter();
    toast.success('Dog updated');
  };

  const handleDelete = async (dogId: string) => {
    await deleteDog(dogId, stateAccount.accountLogged.token as string);
    await handleGetDogsByShelter();
  };

  return (
    <div className={style.admin}>
      <div className={style.container_buttons}>
        {showFormNewDog ? (
          <>
            <DogForm
              handlerFormDog={handlerFormDog}
              handleAddDog={handleAddDog}
              handleUpdateDog={handleUpdateDog}
              dataUpdateDog={dataUpdateDog}
            />
          </>
        ) : (
          <button className={genericStyles.button} onClick={handlerFormDog}>
            Add new dog
          </button>
        )}
        {!showFormNewDog && (
          <span onClick={() => setshowArchivedDogs(!showArchivedDogs)}>
            {!showArchivedDogs ? (
              <ArchiveBoxIcon className={style.icon} />
            ) : (
              <ArrowLeftIcon className={style.icon} />
            )}
          </span>
        )}
      </div>
      <div
        className={`${style.admin} ${showFormNewDog && style.admin_disabled} `}
      >
        <h2>
          {' '}
          {showArchivedDogs
            ? `Archived dogs: ${stateDogs.shelterDogs.length}`
            : `Active dogs:  ${stateDogs.shelterDogs.length}`}
        </h2>
        <table>
          <thead>
            <tr>
              {thTable.map((th) => (
                <th key={th}>{th}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <p>Loading</p>
            ) : (
              stateDogs.shelterDogs.map((dog) => {
                return (
                  <tr key={dog.id}>
                    <td>
                      <Link
                        to={`/dog/details/${dog.id}`}
                        className={style.link}
                      >
                        <img src={dog.image as string} alt={dog.name} />
                      </Link>
                    </td>
                    <td>{dog.name}</td>
                    <td>{dog.gender}</td>
                    <td>{dog.size}</td>
                    <td>{dog.years}</td>
                    <td>{dog.months}</td>
                    <td>{dog.chipNumber}</td>
                    <td>{`${dog.breed ? '✅' : '❌'}`}</td>
                    <td>{`${dog.adoptedBy ? '✅' : '❌'}`}</td>
                    <td>{transformDate(dog.registerDate)}</td>
                    <td>{dog.views}</td>
                    <td>{dog.requests}</td>
                    <td>
                      <span
                        onClick={() => {
                          handleRetrieveDataDog(dog);
                        }}
                      >
                        <PencilSquareIcon className={style.icon} />
                      </span>
                      <span onClick={() => handleUpdateRegisteredDog(dog.id)}>
                        {!showArchivedDogs ? (
                          <ArchiveBoxIcon className={style.icon} />
                        ) : (
                          <ArchiveBoxXMarkIcon className={style.icon} />
                        )}
                      </span>
                      {!dog.adoptedBy && (
                        <span onClick={() => handleDelete(dog.id)}>
                          <TrashIcon className={style.icon} />
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
        {stateDogs.dogs.length === 0 && (
          <h2 className={`${genericStyles.title} ${style.no_registered}`}>
            No dogs registered
          </h2>
        )}
      </div>
    </div>
  );
}
