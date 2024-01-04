import { createContext } from 'react';
import { Props } from './provider.types';
import { useDogs } from '../hooks/use.dogs';
import { useAccounts } from '../hooks/use.accounts';

export type UseDogStructured = ReturnType<typeof useDogs>;
export type UseAccountStructured = ReturnType<typeof useAccounts>;

export const DogsContexts = createContext({} as UseDogStructured);
export const AccountsContexts = createContext({} as UseAccountStructured);

export const ContextProvider = ({ children }: Props) => {
  const contextDogs = useDogs();
  const contextShelters = useAccounts();

  return (
    <DogsContexts.Provider value={contextDogs}>
      <AccountsContexts.Provider value={contextShelters}>
        {children}
      </AccountsContexts.Provider>
    </DogsContexts.Provider>
  );
};
