import { useContext, useEffect, useState } from 'react';
import { AccountsContexts, DogsContexts } from '../../context/context';
import DogForm from '../../components/dog.form/dog.form';
import { Dog } from '../../models/dog.type';
import { IoIosArchive, IoIosCheckboxOutline } from 'react-icons/io';

import style from './admin.module.scss';
import genericStyles from '../../app/app.module.scss';

export default function Admin() {
  const { getDogsByShelter, stateDogs, addDog, loading } =
    useContext(DogsContexts);
  const { stateAccount } = useContext(AccountsContexts);
  const [showFormNewDog, setShowFormNewDog] = useState(false);
  const [showArchivedDogs, setshowArchivedDogs] = useState<boolean>(false);

  const thTable = [
    'Name',
    'Gender',
    'Size',
    'Years',
    'Months',
    'Chip Number',
    'Has Breed',
    'Has Adopted',
    'Views',
    'Requests',
    'Image',
    'Actions',
  ];

  useEffect(() => {
    getDogsByShelter(
      stateAccount.accountLogged.user?._id as string,
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
        {
          <span
            className={style.icon}
            onClick={() => setshowArchivedDogs(!showArchivedDogs)}
          >
            {!showArchivedDogs ? <IoIosArchive /> : <IoIosCheckboxOutline />}
          </span>
        }
      </div>
      <div
        className={`${style.admin} ${showFormNewDog && style.admin_disabled} `}
      >
        <h2> {showArchivedDogs ? 'Archived dogs' : 'Active dogs'}</h2>
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
              stateDogs.dogs.map((dog) => {
                return (
                  <tr>
                    <td>{dog.name}</td>
                    <td>{dog.gender}</td>
                    <td>{dog.size}</td>
                    <td>{dog.years}</td>
                    <td>{dog.months}</td>
                    <td>{dog.chipNumber}</td>
                    <td>{`${dog.breed ? 'yes' : 'no'}`}</td>
                    <td>{`${dog.adoptedBy ? 'yes' : 'no'}`}</td>
                    <td>{dog.views}</td>
                    <td>{dog.requests}</td>
                    <td>
                      <img src={dog.image as string} alt={dog.name} />
                    </td>
                    <td>
                      <button>Edit</button>
                      <button>Delete</button>
                      <button>Archive</button>
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
