import { useContext, useState } from 'react';
import { AccountsContexts } from '../../context/context';
import { transformDate } from '../../utils/transformDate';
import { AdoptionRequest } from '../../models/adoption.request.type';
import { useNavigate } from 'react-router-dom';

import style from './requests.list.module.scss';
import genericStyle from '../../app/app.module.scss';
import {
  TrashIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';

export const RequestList = ({
  adoptionRequest,
  deleteAdoptionRequest,
  updateAdoptionRequest,
}: {
  adoptionRequest: AdoptionRequest;
  deleteAdoptionRequest: (adoptionRequestId: string, token: string) => void;
  updateAdoptionRequest: (
    adoptionRequestId: string,
    status: string,
    userId: string,
    dogId: string,
    token: string
  ) => void;
}) => {
  const navigate = useNavigate();
  const { stateAccount } = useContext(AccountsContexts);
  const [expanded, setExpanded] = useState(false);

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  const goToDetaildog = (dogIg: string) => () => {
    navigate('/dog/details/' + dogIg);
  };

  const handleChangeStatusdoptionRequest = (
    adoptionRequestId: string,
    status: string
  ) => {
    updateAdoptionRequest(
      adoptionRequestId,
      status,
      adoptionRequest.user.id,
      adoptionRequest.dog.id,
      stateAccount.accountLogged?.token as string
    );
  };

  console.log(adoptionRequest);

  return (
    <div className={style.adoption_request_card}>
      <div className={style.container}>
        <MagnifyingGlassIcon
          className={style.icon}
          onClick={goToDetaildog(adoptionRequest.dog?.id)}
        />
        <ChevronDownIcon className={style.icon} onClick={handleExpand} />
        <p>{transformDate(adoptionRequest.createdAt)}</p>
        <p
          onClick={goToDetaildog(adoptionRequest.dog.id)}
          style={{ width: '150px' }}
        >
          {adoptionRequest.dog.name}
        </p>
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
        <p>{`${
          stateAccount.accountLogged.user?.role === 'shelter'
            ? adoptionRequest.user.province
            : adoptionRequest.shelter.province
        }`}</p>
        <span>{`${adoptionRequest.hasDogs ? '🐶✅' : '🐶❌'}`}</span>
        <span>{`${adoptionRequest.hasCats ? '🐈✅' : '🐈❌'}`}</span>
        <span>{`${adoptionRequest.hasChildren ? '👶🏻✅' : '👶🏻❌'}`}</span>
        <span>{`${adoptionRequest.hasExperience ? '👴🏻✅' : '👴🏻❌'}`}</span>
        <span>{`${adoptionRequest.hasGarden ? '🪴✅' : '🪴❌'}`}</span>
        <p
          className={`${style.status} ${
            style['status_' + adoptionRequest.status]
          }`}
        >
          {adoptionRequest.status.toUpperCase()}
        </p>
        {stateAccount.accountLogged.user?.role === 'user' &&
          adoptionRequest.status === 'pending' && (
            <TrashIcon
              className={style.trash}
              onClick={() =>
                deleteAdoptionRequest(
                  adoptionRequest.id,
                  stateAccount.accountLogged?.token as string
                )
              }
            />
          )}
      </div>

      {expanded && (
        <div className={style.expanded_content}>
          <p>{adoptionRequest.text}</p>
          {stateAccount.accountLogged.user?.role === 'shelter' &&
            adoptionRequest.status === 'pending' && (
              <div className={style.actions}>
                <button
                  className={`${genericStyle.button} ${style.button_accepted}`}
                  onClick={() => {
                    handleChangeStatusdoptionRequest(
                      adoptionRequest.id,
                      'accepted'
                    );
                  }}
                >
                  Accept
                </button>
                <button
                  className={`${genericStyle.button} ${style.button_rejected}`}
                  onClick={() => {
                    handleChangeStatusdoptionRequest(
                      adoptionRequest.id,
                      'rejected'
                    );
                  }}
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
