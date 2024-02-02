import { useContext, useState } from 'react';
import { AdoptionRequestInput } from '../../models/adoption.request.type';
import {
  AccountsContexts,
  AdoptionRequestsContexts,
} from '../../context/context';
import { Dog } from '../../models/dog.type';
import { isFormRequestValid } from './validate/isFormRequestValid';
import { toast } from 'sonner';

import style from './adoption.request.form.module.scss';
import genericStyle from '../../app/app.module.scss';

export default function AdoptionRequestForm({
  infoDog,
  setShowAdoptionRequestForm,
  checkDogIsAdoptionRequestByUser,
}: {
  infoDog: Partial<Dog>;
  setShowAdoptionRequestForm: (showAdoptionRequestForm: boolean) => void;
  checkDogIsAdoptionRequestByUser: () => void;
}) {
  const { addAdoptionRequest } = useContext(AdoptionRequestsContexts);
  const { stateAccount } = useContext(AccountsContexts);
  const [formDataAdoptionRequest, setFormDataAdoptionRequest] = useState<
    Partial<AdoptionRequestInput>
  >({
    dogId: infoDog.id as string,
    userId: stateAccount.accountLogged?.user?.id as string,
    shelterId: infoDog.shelter?.id as string,
    text: undefined,
    hasDogs: false,
    hasCats: false,
    hasGarden: false,
    hasExperience: false,
    hasChildren: false,
  });

  const handleAdoptionRequest = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await addAdoptionRequest(
      formDataAdoptionRequest,
      stateAccount.accountLogged.token as string
    );

    if (result) {
      setShowAdoptionRequestForm(false);
      checkDogIsAdoptionRequestByUser();
      toast.success('Adoption request sent');
    }
  };

  return (
    <form onSubmit={(e) => handleAdoptionRequest(e)} className={style.form}>
      <button
        onClick={() => setShowAdoptionRequestForm(false)}
        className={`${genericStyle.button} ${style.button_cancel}`}
      >
        X
      </button>
      <h1>Adoption Form</h1>
      <textarea
        name="text"
        cols={40}
        rows={5}
        placeholder="Write a message to the shelter"
        required
        onChange={(e) =>
          setFormDataAdoptionRequest({
            ...formDataAdoptionRequest,
            text: e.target.value,
          })
        }
        className={genericStyle.input}
      />
      <div className={style.checkbox}>
        <div>
          <label htmlFor="">{'Has dogs?'}</label>
          <input
            type="checkbox"
            name="hasDogs"
            id="hasDogs"
            onChange={(e) => {
              setFormDataAdoptionRequest({
                ...formDataAdoptionRequest,
                hasDogs: e.target.checked,
              });
            }}
          />
        </div>
        <div>
          <label htmlFor="">{'Has cats?'}</label>
          <input
            type="checkbox"
            name="hasCats"
            value="hasCats"
            id="hasCats"
            onChange={(e) => {
              setFormDataAdoptionRequest({
                ...formDataAdoptionRequest,
                hasCats: e.target.checked,
              });
            }}
          />
        </div>
        <div>
          <label htmlFor="">{'Has garden?'}</label>
          <input
            type="checkbox"
            name="hasGarden"
            value="hasGarden"
            id="hasGarden"
            onChange={(e) => {
              setFormDataAdoptionRequest({
                ...formDataAdoptionRequest,
                hasGarden: e.target.checked,
              });
            }}
          />
        </div>
        <div>
          <label htmlFor="">{'Has experience?'}</label>
          <input
            type="checkbox"
            name="hasExperience"
            value="hasExperience"
            id="hasExperience"
            onChange={(e) => {
              setFormDataAdoptionRequest({
                ...formDataAdoptionRequest,
                hasExperience: e.target.checked,
              });
            }}
          />
        </div>
        <div>
          <label htmlFor="">{'Has children?'}</label>
          <input
            type="checkbox"
            name="hasChildren"
            value="hasChildren"
            id="hasChildren"
            onChange={(e) => {
              setFormDataAdoptionRequest({
                ...formDataAdoptionRequest,
                hasChildren: e.target.checked,
              });
            }}
          />
        </div>
      </div>
      <button
        className={`${
          isFormRequestValid(formDataAdoptionRequest)
            ? genericStyle.button
            : genericStyle.button_disabled
        }`}
      >
        Send
      </button>
    </form>
  );
}
