import { useContext, useEffect } from 'react';
import { AccountsContexts, AdoptionRequestsContexts } from '@/context/context';

import style from './requests.module.scss';
import { RequestList } from '@/components/requests.list/requests.list';

export default function Requests() {
  const {
    stateAdoptionRequests,
    getAdoptionRequestsByShelterId,
    deleteAdoptionRequest,
    updateAdoptionRequest,
  } = useContext(AdoptionRequestsContexts);
  const { stateAccount } = useContext(AccountsContexts);

  useEffect(() => {
    getAdoptionRequestsByShelterId(
      stateAccount.accountLogged?.user?.role as string,
      stateAccount.accountLogged?.user?.id as string,
      stateAccount.accountLogged?.token as string
    );
  }, []);

  const { adoptionRequests } = stateAdoptionRequests;

  return (
    <div className={style.requests}>
      <h1>My requests</h1>
      {adoptionRequests.length ? (
        adoptionRequests.map((adoptionRequest) => (
          <RequestList
            key={adoptionRequest.id}
            adoptionRequest={adoptionRequest}
            deleteAdoptionRequest={deleteAdoptionRequest}
            updateAdoptionRequest={updateAdoptionRequest}
          />
        ))
      ) : (
        <p>No requests</p>
      )}
    </div>
  );
}
