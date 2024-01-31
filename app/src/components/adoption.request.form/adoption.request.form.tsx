import { useContext, useState } from 'react';
import { AdoptionRequestInput } from '../../models/adoption.request.type';
import {
  AccountsContexts,
  AdoptionRequestsContexts,
} from '../../context/context';
import { Dog } from '../../models/dog.type';
import { toast } from 'sonner';

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
    <form onSubmit={(e) => handleAdoptionRequest(e)}>
      <button onClick={() => setShowAdoptionRequestForm(false)}>X</button>
      <h1>Adoption Form</h1>
      <input
        type="text"
        name="text"
        required
        onChange={(e) =>
          setFormDataAdoptionRequest({
            ...formDataAdoptionRequest,
            text: e.target.value,
          })
        }
      />
      <label htmlFor="">{'hasDogs'}</label>
      <input
        type="checkbox"
        name="hasDogs"
        onChange={(e) => {
          setFormDataAdoptionRequest({
            ...formDataAdoptionRequest,
            hasDogs: e.target.checked,
          });
        }}
      />
      <label htmlFor="">{'hasCats'}</label>
      <input
        type="checkbox"
        name="hasCats"
        value="hasCats"
        onChange={(e) => {
          setFormDataAdoptionRequest({
            ...formDataAdoptionRequest,
            hasCats: e.target.checked,
          });
        }}
      />
      <label htmlFor="">{'hasGarden'}</label>
      <input
        type="checkbox"
        name="hasGarden"
        value="hasGarden"
        onChange={(e) => {
          setFormDataAdoptionRequest({
            ...formDataAdoptionRequest,
            hasGarden: e.target.checked,
          });
        }}
      />
      <label htmlFor="">{'hasExperience'}</label>
      <input
        type="checkbox"
        name="hasExperience"
        value="hasExperience"
        onChange={(e) => {
          setFormDataAdoptionRequest({
            ...formDataAdoptionRequest,
            hasExperience: e.target.checked,
          });
        }}
      />
      <label htmlFor="">{'hasChildren'}</label>
      <input
        type="checkbox"
        name="hasChildren"
        value="hasChildren"
        onChange={(e) => {
          setFormDataAdoptionRequest({
            ...formDataAdoptionRequest,
            hasChildren: e.target.checked,
          });
        }}
      />
      <button>Send</button>
    </form>
  );
}
