import { createContext } from 'react';
import { Props } from './provider.types';
import { useDogs } from '../hooks/use.dogs';
import { useAccounts } from '../hooks/use.accounts';
import { useAdoptionRequests } from '../hooks/use.adoption.requests';

export type UseDogStructured = ReturnType<typeof useDogs>;
export type UseAccountStructured = ReturnType<typeof useAccounts>;
export type UseAdoptionRequestStructured = ReturnType<
  typeof useAdoptionRequests
>;

export const DogsContexts = createContext({} as UseDogStructured);
export const AccountsContexts = createContext({} as UseAccountStructured);
export const AdoptionRequestsContexts = createContext(
  {} as UseAdoptionRequestStructured
);

export const ContextProvider = ({ children }: Props) => {
  const contextDogs = useDogs();
  const contextAccounts = useAccounts();
  const contextAdoptionRequests = useAdoptionRequests();

  return (
    <DogsContexts.Provider value={contextDogs}>
      <AccountsContexts.Provider value={contextAccounts}>
        <AdoptionRequestsContexts.Provider value={contextAdoptionRequests}>
          {children}
        </AdoptionRequestsContexts.Provider>
      </AccountsContexts.Provider>
    </DogsContexts.Provider>
  );
};
