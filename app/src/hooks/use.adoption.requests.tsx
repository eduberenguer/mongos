import { useReducer } from 'react';
import { AdoptionRequestInput } from '../models/adoption.request.type';
import { AdoptionRequestRepository } from '../services/adoption.request/adoption.request.repository';
import { adoptionRequestReducer } from '../store/reducers/adoption.request.reducer';
import { initialStateAdoptionRequest } from '../mocks/initial.state.reducer';
import * as ac from '../store/actions.creators/adoption.request.action.creator';

export function useAdoptionRequests() {
  const repo = new AdoptionRequestRepository();
  const [stateAdoptionRequests, dispatch] = useReducer(
    adoptionRequestReducer,
    initialStateAdoptionRequest
  );

  const addAdoptionRequest = async (
    adoptionRequest: Partial<AdoptionRequestInput>,
    token: string
  ) => {
    const response = await repo.create(adoptionRequest, token);
    dispatch(ac.addAdoptionRequest(response));
    return response;
  };

  const getAdoptionRequests = async () => {
    const response = await repo.getAll();
    dispatch(ac.loadAdoptionsRequests(response));
    return response;
  };

  const getAdoptionRequestsByShelterId = async (
    role: string,
    shelterId: string,
    token: string
  ) => {
    const response = await repo.getAdoptionRequestsByShelterId(
      role,
      shelterId,
      token
    );
    dispatch(ac.loadAdoptionsRequests(response));
    return response;
  };

  const checkDogIsAdoptionRequest = async (dogId: string, userId: string) => {
    const response = await repo.checkDogIsAdoptionRequest(dogId, userId);
    return response;
  };

  return {
    stateAdoptionRequests,
    addAdoptionRequest,
    getAdoptionRequests,
    checkDogIsAdoptionRequest,
    getAdoptionRequestsByShelterId,
  };
}
