import { useContext, useEffect, useState } from 'react';
import { AccountsContexts, DogsContexts } from '../../context/context';
import DogForm from '../../components/dog.form/dog.form';
import { Dog } from '../../models/dog.type';

export default function Admin() {
  const { getDogsByShelter, stateDogs, addDog } = useContext(DogsContexts);
  const { stateAccount } = useContext(AccountsContexts);
  const [showFormNewDog, setShowFormNewDog] = useState(false);

  useEffect(() => {
    getDogsByShelter(stateAccount.accountLogged.user?._id as string);
  }, []);

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
    <>
      <h2>Soy admin</h2>
      <p>My Dogs</p>
      {stateDogs.dogs.map((dog) => {
        return <p>{dog.name}</p>;
      })}
      {showFormNewDog ? (
        <>
          <DogForm
            handlerFormDog={handlerFormDog}
            handleAddDog={handleAddDog}
          />
        </>
      ) : (
        <button onClick={handlerFormDog}>Add dog</button>
      )}
    </>
  );
}
