import { useContext, useEffect, useState } from 'react';
import { AccountsContexts, DogsContexts } from '../../context/context';
import DogForm from '../../components/dog.form/dog.form';
import { Dog } from '../../models/dog.type';
import { IoIosArchive, IoIosCheckboxOutline } from 'react-icons/io';
import { MdDeleteForever, MdEdit } from 'react-icons/md';
import { transformDate } from '../../utils/transformDate';
import { toast } from 'sonner';

import style from './shelter.admin.module.scss';
import genericStyles from '../../app/app.module.scss';

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
  const handleUpdateDog = async (dogId: string) => {
    await updateDog(
      dogId,
      {
        archived: !stateDogs.shelterDogs.find((dog) => dog.id === dogId)
          ?.archived,
      },
      stateAccount.accountLogged.token as string
    );
    getDogsByShelter(
      stateAccount.accountLogged.user?.id as string,
      showArchivedDogs
    );
  };
  useEffect(() => {
    getDogsByShelter(
      stateAccount.accountLogged.user?.id as string,
      showArchivedDogs
    );
  }, [showArchivedDogs]);

  const handlerFormDog = () => {
    setShowFormNewDog(!showFormNewDog);
  };

  const handleAddDog = (
    e: React.FormEvent<HTMLFormElement>,
    dog: Partial<Dog>
  ) => {
    e.preventDefault();
    addDog(dog, stateAccount.accountLogged.token as string);
    handlerFormDog();
    setshowArchivedDogs(true);
    getDogsByShelter(
      stateAccount.accountLogged.user?.id as string,
      showArchivedDogs
    );
    toast.success('Dog added');
    getDogs();
  };

  const handleDelete = async (dogId: string) => {
    await deleteDog(dogId, stateAccount.accountLogged.token as string);
    await getDogsByShelter(
      stateAccount.accountLogged.user?.id as string,
      showArchivedDogs
    );
  };
  return (
    <div className={style.admin}>
      <div className={style.container_buttons}>
        {showFormNewDog ? (
          <>
            <DogForm
              handlerFormDog={handlerFormDog}
              handleAddDog={handleAddDog}
            />
          </>
        ) : (
          <button className={genericStyles.button} onClick={handlerFormDog}>
            Add new dog
          </button>
        )}
        {!showFormNewDog && (
          <span
            className={style.icon}
            onClick={() => setshowArchivedDogs(!showArchivedDogs)}
          >
            {!showArchivedDogs ? <IoIosArchive /> : <IoIosCheckboxOutline />}
          </span>
        )}
      </div>
      <div
        className={`${style.admin} ${showFormNewDog && style.admin_disabled} `}
      >
        <h2>
          {' '}
          {showArchivedDogs
            ? `Archived dogs ${stateDogs.shelterDogs.length}`
            : `Active dogs ${stateDogs.shelterDogs.length}`}
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
                      <img src={dog.image as string} alt={dog.name} />
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
                      <span>
                        <MdEdit />
                      </span>
                      <span onClick={() => handleUpdateDog(dog.id)}>
                        {!showArchivedDogs ? (
                          <IoIosArchive />
                        ) : (
                          <IoIosCheckboxOutline />
                        )}
                      </span>
                      {!dog.adoptedBy && (
                        <span onClick={() => handleDelete(dog.id)}>
                          <MdDeleteForever />
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
          <h2 className={genericStyles.title}>No dogs registered</h2>
        )}
      </div>
    </div>
  );
}
