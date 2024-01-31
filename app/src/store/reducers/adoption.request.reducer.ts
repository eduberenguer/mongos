import { AdoptionRequest } from '../../models/adoption.request.type';
import { adoptionRequestActions } from '../actions/adoption.request.action';
import { AdoptionRequestActions } from '../actions.creators/adoption.request.action.creator';

export type adoptionRequestState = {
  adoptionRequests: AdoptionRequest[];
};

export const adoptionRequestReducer = (
  state: adoptionRequestState,
  action: AdoptionRequestActions
): adoptionRequestState => {
  switch (action.type) {
    case adoptionRequestActions.load:
      return {
        ...state,
        adoptionRequests: action.payload as AdoptionRequest[],
      };
    case adoptionRequestActions.addAdoptionRequest:
      return {
        ...state,
        adoptionRequests: [
          ...(state.adoptionRequests as AdoptionRequest[]),
          action.payload as AdoptionRequest,
        ],
      };
    default:
      return state;
  }
};
