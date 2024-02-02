import {
  AdoptionRequestInput,
  AdoptionRequestResponse,
} from '../../models/adoption.request.type';
import { apiUrl } from '../../config';
import { transformDataResponse } from '../../utils/transformDataResponse';

export type ApiResponseDataAdoptionRequest = AdoptionRequestResponse[];
export type ApiResponseAdoptionRequest = AdoptionRequestResponse;

export class AdoptionRequestRepository {
  private getApiUrl() {
    if (process.env.NODE_ENV === 'test') {
      return 'http://localhost:3000/';
    }

    return apiUrl;
  }

  async create(request: Partial<AdoptionRequestInput>, token: string) {
    const urlFinal = `${this.getApiUrl()}adoptionRequest`;
    const data = await fetch(urlFinal, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(request),
    });

    const response: ApiResponseAdoptionRequest = await data.json();
    const transformResponse = transformDataResponse([response]);

    return transformResponse[0];
  }

  async getAll() {
    const urlFinal = `${this.getApiUrl()}adoptionRequest`;
    const data = await fetch(urlFinal);

    const response: ApiResponseDataAdoptionRequest = await data.json();
    const transformResponse = transformDataResponse(response);

    return transformResponse;
  }

  async getById(id: string) {
    const urlFinal = `${this.getApiUrl()}adoptionRequest/${id}`;
    const data = await fetch(urlFinal);
    const response: ApiResponseAdoptionRequest = await data.json();

    return response;
  }

  async checkDogIsAdoptionRequest(dogId: string, userId: string) {
    const urlFinal = `${this.getApiUrl()}adoptionRequest/${dogId}/${userId}`;
    const data = await fetch(urlFinal);
    const response: ApiResponseAdoptionRequest = await data.json();

    return response;
  }

  async getAdoptionRequestsByShelterId(
    role: string,
    shelterId: string,
    token: string
  ) {
    const urlFinal = `${this.getApiUrl()}adoptionRequest/${role}/${shelterId}`;
    const data = await fetch(urlFinal, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });

    const response: ApiResponseDataAdoptionRequest = await data.json();
    const transformResponse = transformDataResponse(response);

    return transformResponse;
  }

  async deleteAdoptionRequest(adoptionRequestId: string, token: string) {
    const urlFinal = `${this.getApiUrl()}adoptionRequest/${adoptionRequestId}`;
    const data = await fetch(urlFinal, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });

    const response: ApiResponseAdoptionRequest = await data.json();

    return response;
  }

  async updateAdoptionRequest(
    adoptionRequestId: string,
    body: Partial<AdoptionRequestInput>,
    token: string
  ) {
    const urlFinal = `${this.getApiUrl()}adoptionRequest/${adoptionRequestId}`;
    const data = await fetch(urlFinal, {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });

    const response: ApiResponseAdoptionRequest = await data.json();
    const transformResponse = transformDataResponse([response]);

    return transformResponse[0];
  }
}
