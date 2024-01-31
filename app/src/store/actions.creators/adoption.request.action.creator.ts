import { adoptionRequestActions } from '../actions/adoption.request.action';
import { AdoptionRequest } from '../../models/adoption.request.type';

export interface AdoptionRequestActions {
  type: string;
  payload?: AdoptionRequest | AdoptionRequest[] | Partial<AdoptionRequest>;
}

export const loadAdoptionsRequests = (
  payload: AdoptionRequest[]
): AdoptionRequestActions => {
  return {
    type: adoptionRequestActions.load,
    payload,
  };
};

export const addAdoptionRequest = (
  payload: Partial<AdoptionRequest>
): AdoptionRequestActions => {
  return {
    type: adoptionRequestActions.addAdoptionRequest,
    payload,
  };
};
