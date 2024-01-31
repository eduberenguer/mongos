import { AdoptionRequestResponse } from '../models/adoption.request.type';

export const transformDataResponse = (response: AdoptionRequestResponse[]) => {
  const transformResponse = response.map((adoptionRequest) => {
    const { dogId, userId, shelterId, ...rest } = adoptionRequest;

    return {
      ...rest,
      dog: dogId,
      user: userId,
      shelter: shelterId,
    };
  });

  return transformResponse;
};
