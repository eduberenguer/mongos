import { useContext, useEffect, useState } from 'react';
import { AccountsContexts, DogsContexts } from '../../context/context';
import { User } from '../../models/user.type';
import { Dog } from '../../models/dog.type';
import { Card } from '../../components/card/card';

import style from './favourites.module.scss';

export default function Favourites() {
  const { stateAccount } = useContext(AccountsContexts);
  const { getDogsByIds } = useContext(DogsContexts);
  const [favouriteDogsInfo, setFavouriteDogsInfo] = useState<Dog[]>([]);

  useEffect(() => {
    const getFavouriteDogs = async () => {
      const favouriteDogIds =
        (stateAccount.accountLogged.user as User)?.favourites || [];

      const result = await getDogsByIds(favouriteDogIds);

      setFavouriteDogsInfo(result);
    };

    getFavouriteDogs();
  }, []);

  return (
    <div className={style.favourites}>
      <h1 className={style.favourites_title}>My favourites dogs</h1>
      <div className={style.container_cards}>
        {favouriteDogsInfo && favouriteDogsInfo.length > 0 ? (
          favouriteDogsInfo.map((dogInfo) => (
            <Card key={dogInfo.id} dog={dogInfo} />
          ))
        ) : (
          <p>You don't have favourite dogs</p>
        )}
      </div>
    </div>
  );
}
