import { useContext, useState } from 'react';
import { AccountsContexts } from '../../context/context';
import { transformDate } from '../../utils/transformDate';
import { AdoptionRequest } from '../../models/adoption.request.type';

import style from './requests.list.module.scss';
import genericStyle from '../../app/app.module.scss';

export const RequestList = ({
  adoptionRequest,
}: {
  adoptionRequest: AdoptionRequest;
}) => {
  const { stateAccount } = useContext(AccountsContexts);
  const [expanded, setExpanded] = useState(false);

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={style.adoption_request_card}>
      <div className={style.container} onClick={handleExpand}>
        <p>{transformDate(adoptionRequest.createdAt)}</p>
        <p>{adoptionRequest.dog.name}</p>
        <img
          src={adoptionRequest.dog.image}
          alt={adoptionRequest.dog.name}
          className={style.img}
        />
        <p>{`${
          stateAccount.accountLogged.user?.role === 'shelter'
            ? adoptionRequest.user.userName
            : adoptionRequest.shelter.shelterName
        }`}</p>
        <p>{`${
          stateAccount.accountLogged.user?.role === 'shelter'
            ? adoptionRequest.user.email
            : adoptionRequest.shelter.email
        }`}</p>
        <span>{`${adoptionRequest.hasDogs ? '🐶✅' : '🐶❌'}`}</span>
        <span>{`${adoptionRequest.hasCats ? '🐈✅' : '🐈❌'}`}</span>
        <span>{`${adoptionRequest.hasChildren ? '👶🏻✅' : '👶🏻❌'}`}</span>
        <span>{`${adoptionRequest.hasExperience ? '👴🏻✅' : '👴🏻❌'}`}</span>
        <span>{`${adoptionRequest.hasGarden ? '🪴✅' : '🪴❌'}`}</span>
        <p>{adoptionRequest.status.toUpperCase()}</p>
      </div>

      {expanded && (
        <div className={style.expanded_content}>
          <p>{adoptionRequest.text}</p>
          {stateAccount.accountLogged.user?.role === 'shelter' && (
            <div className={style.actions}>
              <button
                className={`${genericStyle.button} ${style.button_accepted}`}
              >
                Accept
              </button>
              <button
                className={`${genericStyle.button} ${style.button_rejected}`}
              >
                Reject
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
