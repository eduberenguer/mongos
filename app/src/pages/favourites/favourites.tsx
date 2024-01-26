import { useContext, useEffect, useState } from 'react';
import { AccountsContexts, DogsContexts } from '../../context/context';
import { User } from '../../models/user.type';
import { Dog } from '../../models/dog.type';

export default function Favourites() {
  const { stateAccount } = useContext(AccountsContexts);
  const { getDogById } = useContext(DogsContexts);
  const [favouriteDogsInfo, setFavouriteDogsInfo] = useState<Dog[]>([]);

  useEffect(() => {
    const fetchAllDogInfo = async () => {
      const favouriteDogIds =
        (stateAccount.accountLogged.user as User)?.favourites || [];

      setFavouriteDogsInfo([]);

      const newDogInfoArray = await Promise.all(
        favouriteDogIds.map(async (dogId) => {
          try {
            const dogInfo = await getDogById(dogId);
            return dogInfo;
          } catch (error) {
            console.error(
              `Error al obtener la información del perro con ID ${dogId}`,
              error
            );
            return null;
          }
        })
      );

      const filteredDogInfoArray = newDogInfoArray.filter(
        (dogInfo): dogInfo is Dog => dogInfo !== null
      );
      setFavouriteDogsInfo([...filteredDogInfoArray]);
    };

    fetchAllDogInfo();
  }, []);

  return (
    <div>
      <h1>Favoritos</h1>
      <ul>
        {favouriteDogsInfo.length &&
          favouriteDogsInfo.map((dogInfo) => (
            <li key={dogInfo.id}>{dogInfo.name}</li>
          ))}
      </ul>
    </div>
  );
}
