import { AdoptionRequest } from '../../../models/adoption.request.type';

export const isFormRequestValid = (
  adoptionRequestFormData: Partial<AdoptionRequest>
) => {
  const { text } = adoptionRequestFormData;
  if (text) {
    return true;
  }
  return false;
};
